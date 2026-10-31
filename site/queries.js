// The 17 business questions, written in SQLite so they run in the browser.
// Original MySQL versions: SQL Queries/Netflix-Project.sql
window.NETFLIX_QUERIES = [
  {
    q: "Count the number of Movies vs TV Shows",
    shot: "Q1 .png",
    sql: `SELECT type, COUNT(*) AS count_of_type
FROM netflix
GROUP BY type;`,
    insight: "Movies make up about 70% of the catalog: 6,131 movies vs 2,676 TV shows."
  },
  {
    q: "Most common rating for Movies and TV Shows",
    shot: "Q2.png",
    sql: `WITH ranked_order AS (
  SELECT type, rating, COUNT(*) AS rating_count,
         ROW_NUMBER() OVER (PARTITION BY type ORDER BY COUNT(*) DESC) AS ranks
  FROM netflix
  GROUP BY type, rating
)
SELECT type, rating, rating_count
FROM ranked_order
WHERE ranks = 1;`,
    insight: "TV-MA (mature audiences) is the most common rating for both movies and TV shows."
  },
  {
    q: "List all movies released in a specific year (2020)",
    shot: "Q3.png",
    sql: `SELECT title, release_year
FROM netflix
WHERE release_year = 2020 AND type = 'Movie';`,
    insight: "Change 2020 to any year and run it again."
  },
  {
    q: "Top 5 countries with the most content",
    shot: "Q4.png",
    sql: `SELECT country, COUNT(country) AS no_of_titles
FROM netflix
WHERE country IS NOT NULL
GROUP BY country
ORDER BY no_of_titles DESC
LIMIT 5;`,
    insight: "The United States leads by a wide margin, followed by India."
  },
  {
    q: "Identify the longest movie",
    shot: "Q5.png",
    sql: `SELECT show_id, type, title,
       CAST(SUBSTR(duration, 1, INSTR(duration, ' ') - 1) AS INTEGER) AS duration_min
FROM netflix
WHERE type = 'Movie'
ORDER BY duration_min DESC
LIMIT 1;`,
    insight: "MySQL's SUBSTRING_INDEX becomes SUBSTR + INSTR in SQLite."
  },
  {
    q: "Content added in the last 5 years",
    shot: "Q6.png",
    sql: `SELECT type, title, date_added
FROM netflix
WHERE date_added >= (SELECT DATE(MAX(date_added), '-5 years') FROM netflix)
ORDER BY date_added DESC;`,
    insight: "Measured from the latest date in the data, not from today, so the result stays meaningful."
  },
  {
    q: "All movies / TV shows by director 'Rajiv Chilaka'",
    shot: "Q7.png",
    sql: `SELECT show_id, type, title, director, country, date_added, release_year
FROM netflix
WHERE director LIKE '%Rajiv Chilaka%';`,
    insight: "LIKE with wildcards also catches titles he co-directed."
  },
  {
    q: "TV shows with more than 5 seasons",
    shot: "Q8.png",
    sql: `SELECT show_id, type, title, duration
FROM netflix
WHERE type = 'TV Show'
  AND CAST(SUBSTR(duration, 1, INSTR(duration, ' ') - 1) AS INTEGER) > 5
ORDER BY CAST(SUBSTR(duration, 1, INSTR(duration, ' ') - 1) AS INTEGER) DESC;`,
    insight: "Long-running shows are rare. Most TV shows on Netflix have just 1 season."
  },
  {
    q: "Count content items in each genre",
    shot: "Q9.png",
    sql: `SELECT listed_in, COUNT(*) AS total
FROM netflix
GROUP BY listed_in
ORDER BY total DESC;`,
    insight: "Groups by the full genre combination, as in the original query."
  },
  {
    q: "Top 5 years with the most content released in India",
    shot: null,
    sql: `SELECT release_year, COUNT(*) AS total_content
FROM netflix
WHERE country LIKE '%India%'
GROUP BY release_year
ORDER BY total_content DESC
LIMIT 5;`,
    insight: "Indian content on Netflix peaked around 2017–2018."
  },
  {
    q: "List all movies that are documentaries",
    shot: "Q11.png",
    sql: `SELECT show_id, type, title, listed_in
FROM netflix
WHERE type = 'Movie'
  AND listed_in LIKE '%Documentaries%';`,
    insight: ""
  },
  {
    q: "Find all content without a director",
    shot: "Q12.png",
    sql: `SELECT show_id, type, title, country, release_year
FROM netflix
WHERE director IS NULL;`,
    insight: "Most of these are TV shows, where the director field is usually left blank."
  },
  {
    q: "Movies with 'Salman Khan' in the last 10 years",
    shot: "Q13.png",
    sql: `SELECT show_id, title, release_year, "cast"
FROM netflix
WHERE "cast" LIKE '%Salman Khan%'
  AND type = 'Movie'
  AND release_year >= (SELECT MAX(release_year) - 10 FROM netflix);`,
    insight: "In SQLite, cast is a keyword, so the column name goes in double quotes."
  },
  {
    q: "Top 10 actors in the most movies produced in India",
    shot: null,
    sql: `WITH RECURSIVE split(actor, rest) AS (
  SELECT '', "cast" || ','
  FROM netflix
  WHERE type = 'Movie' AND country LIKE '%India%' AND "cast" IS NOT NULL
  UNION ALL
  SELECT TRIM(SUBSTR(rest, 1, INSTR(rest, ',') - 1)),
         SUBSTR(rest, INSTR(rest, ',') + 1)
  FROM split
  WHERE rest <> ''
)
SELECT actor, COUNT(*) AS movies
FROM split
WHERE actor <> ''
GROUP BY actor
ORDER BY movies DESC
LIMIT 10;`,
    insight: "A recursive CTE splits the comma-separated cast list into one row per actor."
  },
  {
    q: "Label content 'Bad' if the description mentions kill / violence",
    shot: "Q15.png",
    sql: `WITH category AS (
  SELECT CASE
           WHEN description LIKE '%kill%' OR description LIKE '%violence%' THEN 'BAD'
           ELSE 'GOOD'
         END AS content_category
  FROM netflix
)
SELECT content_category, COUNT(*) AS number_of_titles
FROM category
GROUP BY content_category;`,
    insight: "Only about 4% of titles mention killing or violence in their description."
  },
  {
    q: "Top 3 most profitable titles per type, released after 2018",
    shot: "Q16.png",
    sql: `WITH profit AS (
  SELECT p.type, n.title, n.release_year,
         p.estimated_revenue_million_usd
           - (p.production_cost_million_usd + p.marketing_cost_million_usd) AS profit_musd
  FROM netflix AS n
  JOIN netflix_content_costs AS p ON n.show_id = p.show_id
  WHERE n.release_year > 2018
),
ranking AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY type ORDER BY profit_musd DESC) AS ranks
  FROM profit
)
SELECT * FROM ranking WHERE ranks <= 3;`,
    insight: "Profit = revenue − (production + marketing cost), ranked within each type with a window function."
  },
  {
    q: "Top country by views among above-average watch-time titles, and its top title",
    shot: "Q17.png",
    sql: `WITH cte1 AS (
  SELECT show_id, avg_watch_time_minutes
  FROM netflix_viewership
  WHERE avg_watch_time_minutes > (SELECT AVG(avg_watch_time_minutes) FROM netflix_viewership)
),
top_region AS (
  SELECT peak_region AS country
  FROM netflix_viewership
  GROUP BY peak_region
  ORDER BY SUM(total_views_millions) DESC
  LIMIT 1
),
cte2 AS (
  SELECT n.show_id, n.title, nv.total_views_millions, n.country
  FROM netflix n
  JOIN netflix_viewership nv ON n.show_id = nv.show_id
  WHERE n.country = (SELECT country FROM top_region)
)
SELECT c1.show_id, c1.avg_watch_time_minutes, c2.title, c2.total_views_millions, c2.country
FROM cte1 c1
JOIN cte2 c2 ON c1.show_id = c2.show_id
ORDER BY c2.total_views_millions DESC, c1.avg_watch_time_minutes DESC
LIMIT 1;`,
    insight: "Chains three CTEs: a subquery filter, a top-region lookup and a join."
  }
];
