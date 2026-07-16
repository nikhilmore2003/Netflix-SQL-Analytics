<p align="center">
<img src="Assets/netflix-banner.png" width="100%">
</p>

<h1 align="center">🎬 Netflix SQL Analytics</h1>

<p align="center">

![MySQL](https://img.shields.io/badge/Database-MySQL-blue?style=for-the-badge&logo=mysql)

![SQL](https://img.shields.io/badge/Language-SQL-orange?style=for-the-badge)

![Status](https://img.shields.io/badge/Project-Completed-success?style=for-the-badge)

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

<p align="center">

A complete SQL-based analysis of Netflix content using MySQL.

Data Cleaning • SQL Analytics • Business Insights • Window Functions • Joins

</p>

---

# 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Objectives](#-objectives)
- [Dataset Information](#-dataset-information)
- [Data Cleaning](#-data-cleaning)
- [Database Schema](#-database-schema)
- [SQL Concepts Used](#-sql-concepts-used)
- [Business Problems Solved](#-business-problems-solved)
- [Additional Insights](#-additional-insights)
- [Project Structure](#-project-structure)
- [Results Preview](#-results-preview)
- [Tools Used](#-tools-used)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

# 📌 Project Overview

This project analyzes Netflix's content catalog using **MySQL**.

The analysis combines three datasets:

- Netflix Content Dataset
- Netflix Production Cost Dataset
- Netflix Viewership Dataset

The project focuses on solving real-world business problems through SQL while demonstrating data cleaning, joins, aggregations, window functions, Common Table Expressions (CTEs), ranking functions, and profitability analysis.

---

# 🎯 Objectives

- Clean raw Netflix datasets
- Build relational database tables
- Analyze Netflix content
- Solve business SQL problems
- Generate additional business insights
- Understand real-world SQL analytics

---

# 📂 Dataset Information

| Dataset | Description |
|----------|-------------|
| netflix.csv | Netflix content information |
| netflix_content_costs.csv | Production cost, marketing cost & estimated revenue |
| netflix_viewership.csv | Viewership statistics and watch time |

---

# 🧹 Data Cleaning

The following preprocessing steps were performed before analysis.

✔ Checked missing values

✔ Handled NULL values

✔ Verified duplicate records

✔ Standardized categorical values

✔ Validated data consistency

✔ Prepared data for SQL analysis

---

# 🗄 Database Schema

The three datasets are connected using the **show_id** column.

<p align="center">

<img src="ER Diagram/ER_Diagram.png" width="700">

</p>

---

# 🛠 SQL Concepts Used

- SELECT
- WHERE
- GROUP BY
- HAVING
- ORDER BY
- LIMIT
- CASE
- Aggregate Functions
- INNER JOIN
- LEFT JOIN
- Common Table Expressions (CTEs)
- Window Functions
- ROW_NUMBER()
- RANK()
- String Functions
- Date Functions

---

# 📊 Business Problems Solved

| Question | Status |
|----------|--------|
| Movies vs TV Shows | ✅ |
| Most Common Rating | ✅ |
| Movies Released in Specific Year | ✅ |
| Top Countries | ✅ |
| Longest Movie | ✅ |
| Recently Added Content | ✅ |
| Director Analysis | ✅ |
| TV Shows with More Than 5 Seasons | ✅ |
| Genre Distribution | ✅ |
| Average Releases in India | ✅ |
| Documentary Movies | ✅ |
| Missing Director Analysis | ✅ |
| Salman Khan Movie Analysis | ✅ |
| Top Indian Actors | ✅ |
| Good vs Bad Content Classification | ✅ |
| Most Profitable Titles | ✅ |
| Highest Contributing Country | ✅ |

---

# 💡 Additional Insights

Besides the mandatory questions, additional analysis was performed to understand:

- Movie vs TV Show performance
- Revenue vs Production Cost
- Country-wise profitability
- Genre performance
- Watch time trends
- Most profitable content
- Business growth opportunities

---

# 📁 Project Structure

```
Netflix-SQL-Analytics
│
├── Assets
├── Dataset
├── Documentation
├── ER Diagram
├── Output
├── Presentation
├── SQL Queries
├── README.md
└── LICENSE
```

---

# 📸 Results Preview

### Movies vs TV Shows

<img src="Output/Q1.png">

---

### Most Profitable Titles

<img src="Output/Q16.png">

---

### Highest Contributing Country

<img src="Output/Q17.png">

---

# 🚀 Tools Used

- MySQL Workbench
- SQL
- Git
- GitHub

---

# 📚 Key Learnings

This project helped strengthen my understanding of:

- Data Cleaning
- Relational Database Design
- SQL Query Optimization
- Window Functions
- Common Table Expressions
- Business Analytics
- Data Interpretation

---

# 🚀 Future Improvements

- Power BI Dashboard
- Tableau Dashboard
- Python Exploratory Data Analysis
- Predictive Analytics
- Interactive Visualizations

---

# 👨‍💻 Author

## Nikhil More

GitHub

https://github.com/nikhilmore2003

LinkedIn

*(Will be updated after project completion.)*

---

<p align="center">

⭐ If you found this project useful, consider giving it a Star.

</p>
