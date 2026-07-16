# 🎬 Netflix SQL Analytics

<p align="center">

![MySQL](https://img.shields.io/badge/Database-MySQL-blue?style=for-the-badge&logo=mysql)

![SQL](https://img.shields.io/badge/Language-SQL-orange?style=for-the-badge)

![Project](https://img.shields.io/badge/Project-Netflix%20Analytics-red?style=for-the-badge)

![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

</p>

<p align="center">

A complete SQL-based analysis of Netflix content using MySQL.

Data Cleaning • SQL Analytics • Business Insights • Window Functions • CTEs • Joins

</p>

---

# 📑 Table of Contents

- Project Overview
- Objectives
- Dataset Information
- Data Cleaning
- Database Schema
- SQL Concepts Used
- Business Problems Solved
- Additional Insights
- Repository Structure
- Tools Used
- Future Improvements
- Author

---

# 📌 Project Overview

This project analyzes Netflix's content catalog using **MySQL**.

The project combines **three different datasets** to answer business-oriented SQL questions and generate meaningful insights.

The analysis demonstrates practical SQL concepts such as:

- Data Cleaning
- Joins
- Aggregate Functions
- Window Functions
- Common Table Expressions (CTEs)
- Ranking Functions
- Business Analytics

---

# 🎯 Objectives

- Clean raw Netflix datasets
- Import datasets into MySQL
- Build relationships between multiple tables
- Solve SQL business problems
- Generate additional business insights
- Present findings using SQL

---

# 📂 Dataset Information

| Dataset | Description |
|----------|-------------|
| netflix.csv | Netflix content information |
| netflix_content_costs.csv | Production cost, marketing cost & estimated revenue |
| netflix_viewership.csv | Viewership statistics and average watch time |

---

# 🧹 Data Cleaning

The following preprocessing steps were performed before analysis.

- Checked missing values
- Handled NULL values
- Verified duplicate records
- Standardized categorical values
- Prepared data for SQL analysis

---

# 🗄 Database Schema

The three datasets are connected using **show_id**.

```
                 netflix
              (show_id PK)
                    │
        ┌───────────┴───────────┐
        │                       │
        │                       │
netflix_content_costs     netflix_viewership
      (show_id FK)             (show_id FK)
```

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

✅ Movies vs TV Shows

✅ Most Common Rating

✅ Movies Released in Specific Year

✅ Top Countries

✅ Longest Movie

✅ Recently Added Content

✅ Director Analysis

✅ TV Shows with More Than 5 Seasons

✅ Genre Distribution

✅ Average Content Released in India

✅ Documentary Movies

✅ Missing Director Analysis

✅ Salman Khan Analysis

✅ Top Indian Actors

✅ Content Categorization

✅ Most Profitable Titles

✅ Highest Contributing Country

---

# 💡 Additional Insights

Apart from the required business questions, additional analysis includes:

- Movie vs TV Show comparison
- Revenue vs Production Cost
- Country-wise profitability
- Genre performance
- Watch time trends
- Most profitable content

---

# 📁 Repository Structure

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

# 🚀 Tools Used

- MySQL Workbench
- SQL
- Git
- GitHub

---

# 📚 Key Learnings

This project improved my understanding of:

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
- Python EDA
- Interactive Visualizations

---

# 👨‍💻 Author

## Nikhil More

GitHub

https://github.com/nikhilmore2003

LinkedIn

*(Will be updated after project completion.)*

---

⭐ If you found this project useful, consider giving it a Star.
