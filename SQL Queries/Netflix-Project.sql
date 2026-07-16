update netflix 
set director = null
where director='';

set sql_safe_updates=0;

update netflix 
set country=null
where country='';

update netflix 
set rating="Not rated" 
where rating='';

update netflix 
set duration="Unknown"
where duration='';

 # 1. Count the number of Movies vs TV Shows.
select distinct type , count(type) as count_of_type from netflix 
group by type;

# 2. Find the most common rating for movies and TV shows.
with ranked_order as 
(
select type , rating , count(*) as rating_count , row_number() over (partition by type order by count(*) desc) as ranks
from netflix 
group by rating , type
)
select type,rating,rating_count
from ranked_order 
where ranks=1; 

#  3. List all movies released in a specific year (e.g., 2020)
select title , release_year from netflix 
where release_year=2020 and type='Movie';

# 4. Find the top 5 countries with the most content on Netflix.
select country , count(country) as no_of_movies_in_country
from netflix
where country is not null
group by country
order by count(country) desc
limit 5;

#  5. Identify the longest movie.
-- Using Substring_index and Cast
select show_id,type,title ,cast(substring_index(duration,' ',1) as unsigned) as total_views
from netflix
where type="Movie"
order by total_views  desc
limit 1;

-- using replace 
select type , title , cast(replace(duration,'min','') as unsigned)as movie_duration
from netflix
where type='movie'
order by movie_duration desc 
limit 1;

# 6. Find content added in the last 5 years.
select type,title,date_added from netflix 
where date_added >=  (
 select date_sub(MAX(date_added), INTERVAL 5 YEAR)
    FROM netflix
    );


# 7. Find all the movies/TV shows by director 'Rajiv Chilaka'!.
select show_id , type , title , director , country , date_added , release_year 
from netflix
where director like '%Rajiv Chilaka%' ;

#  8. List all TV shows with more than 5 seasons.
select show_id,type,title, duration 
from netflix
where type="TV Show" 
and cast(substring_index(duration,' ',1 ) as unsigned)>5
order by cast(substring_index(duration,' ',1) as unsigned) desc;


# 9. Count the number of content items in each genre.
select listed_in , count(*) as total 
from netflix 
group by listed_in
order by total desc;

# 10.Find each year and the average numbers of content release in India on netflix. return top 5 year with highest avg content release.

-- yearly movies added count
select release_year , count(*) as total_content 
from netflix 
where country like '%India%'
group by release_year 
order by total_content desc
limit 5;

-- Monthly Average count
select month(date_added) , round(count(*)/12,0) as avg_release_per_month 
from netflix
where country like '%India%'
group by month(date_added) 
order by month(date_added) desc;


# 11. List all movies that are documentaries.
select show_id , type ,title,  listed_in 
from netflix 
where type='Movie' and 
listed_in like '%Documentaries%';

# 12. Find all content without a director.
select * from netflix 
where director is null;

# 13. Find how many movies actor 'Salman Khan' appeared in last 10 years.
select * from netflix 
where (cast like '%Salman Khan%' or cast like 'Salman Khan%' or cast like '%Salman Khan' )
and (type='Movie')
and release_year >= (
select max(release_year)-10 from netflix);

# 14. Find the top 10 actors who have appeared in the highest number of movies produced in India.



#  15. Categorize the content based on the presence of the keywords 'kill' and 'violence' in the description field.
-- Label content containing these keywords as 'Bad' and all other content as 'Good'. Count how many items fall into each category.
with category as 
(
select description , 
case 
when description like '%kill%' 
or  description like '%violence%' 
then "BAD"
else "GOOD"
end as content_category
from netflix
)
select content_category , count(*) as number_of_category 
from category
group by content_category;


-- 16. For each content type (Movie / TV Show), find the top 3 most profitable titles released after 2018, 
-- where profitability is defined as: estimated_revenue − (production_cost + marketing_cost). Also display their rank within each type.
with profit as (
select p.type , n.title , n.release_year , p.estimated_revenue_million_usd-(p.production_cost_million_usd + p.marketing_cost_million_usd) as profit_in_USD
from netflix as n 
join netflix_content_costs as p
on n.show_id = p.show_id 
where n.release_year >2018
),
ranking as 
(
select *, row_number() over(partition by p.type order by profit_in_USD desc) as ranks 
from profit)
select * from ranking
where ranks <=3;

# 17. Among titles where average watch time is above the overall platform average, 
-- identify the country that contributes the highest total views, and show the top contributing title from that country.

with cte1 as(
select show_id , avg_watch_time_minutes
from netflix_viewership
where avg_watch_time_minutes > (select avg(avg_watch_time_minutes) from netflix_viewership)),
cte2 as(
select n.show_id, n.title, nv.total_views_millions, n.country from netflix n
join netflix_viewership nv
on n.show_id= nv.show_id

where country = (select country from 
	(select peak_region as country, sum(total_views_millions) as highest_views
	from netflix_viewership 
	group by peak_region 
	order by sum(total_views_millions) desc
	limit 1) as t)
order by nv.total_views_millions desc)
select c1.show_id,c1.avg_watch_time_minutes,c2.title,c2.total_views_millions, c2.country from cte1 c1
join cte2 c2
on c1.show_id =c2.show_id
order by c2.total_views_millions desc,
		c1.avg_watch_time_minutes desc
limit 1;

