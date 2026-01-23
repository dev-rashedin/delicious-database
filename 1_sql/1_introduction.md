# SQL Series — Introduction

Welcome to the **SQL Series**, a structured set of articles designed for developers who want to learn SQL from the ground up or refresh their knowledge. This series is **language-agnostic** whenever possible, focusing only on **PostgreSQL, MySQL, and SQLite** when syntax differs.

In this first article, we cover **the history of SQL**, **basic concepts**, and **essential commands**.

---

## The Birth and Evolution of SQL

SQL did not arrive fully formed as a finished technology. Instead, it emerged gradually from early efforts to make data storage **reliable, scalable, and independent of application logic**.

### The Problem Before SQL (1960s)

In the early 1960s, most data was stored in **flat files**:

* Data structure was tightly coupled with program code
* Even a small change in data format required rewriting large parts of an application
* As systems grew more complex, this approach became unmanageable

### A Foundational Breakthrough (1970)

**Edgar F. Codd** at IBM published *“A Relational Model of Data for Large Shared Data Banks”*:

* Organizing data into **relations (tables)**
* Structuring tables with **rows and columns**
* Moving away from hierarchical and network-based models

This formed the theoretical foundation of modern databases.

### System R and the Birth of SQL (1970s)

IBM's **System R** project developed **SEQUEL (Structured English Query Language)**:

* Users describe **what** data they want
* The database decides **how** to retrieve it

Due to trademark issues, SEQUEL was later renamed **SQL**, though “sequel” remains common.

### Standardization and Industry Adoption (1980s)

SQL was standardized to ensure cross-platform compatibility:

* **ANSI (1986)** and **ISO (1987)** standards
* Core SQL concepts remained portable across systems
* Vendors added extensions, but standards ensured consistency

### Growth, Competition, and Maturity (1990s–2000s)

SQL evolved with enterprise systems and the internet:

* Joins, subqueries, transactions, indexing, stored procedures
* Strong consistency and mature tooling kept SQL dominant

### SQL in the Modern Era

Modern relational databases now support:

* JSON data types
* Window functions and CTEs
* Parallel query execution
* Cloud-native PostgreSQL-based platforms

SQL remains a cornerstone technology more than five decades later.

---

## SQL Basics — A Developer’s Crash Course

This section covers **core SQL concepts**, from databases and tables to `SELECT` queries and data models.

---

### What Is a Database?

A **database** is an organized collection of data. Main types:

| Type                       | Description                             | Example                   |
| -------------------------- | --------------------------------------- | ------------------------- |
| **SQL (Relational)**       | Tables with predefined schemas          | MySQL, PostgreSQL, SQLite |
| **NoSQL (Non-relational)** | Flexible schemas (documents, key-value) | MongoDB, Cassandra        |

---

### SQL vs NoSQL

**SQL** = **Structured Query Language**. Example:

```sql
SELECT * FROM birthdays
WHERE person = 'husband';
```

SQL databases store data in **tables** connected by **keys**.

---

### Schema

A **schema** defines table structure — columns, types, constraints.

```sql
CREATE TABLE birthdays (
  id INT PRIMARY KEY,
  person VARCHAR(50),
  birth_date DATE
);
```

**PostgreSQL** and **SQLite** versions are largely identical; no differences here.

---

### Database Management Systems (RDBMS)

Software to manage databases:

| RDBMS          | Highlights                        |
| -------------- | --------------------------------- |
| **MySQL**      | Open-source, popular for web dev  |
| **PostgreSQL** | Open-source, fast, scalable       |
| **SQLite**     | Lightweight, embedded/mobile apps |

---

### CRUD Operations

| Operation | SQL Command |
| --------- | ----------- |
| Create    | `INSERT`    |
| Read      | `SELECT`    |
| Update    | `UPDATE`    |
| Delete    | `DELETE`    |

---

### SQL Statements vs Queries

| Type              | Purpose                  |
| ----------------- | ------------------------ |
| **SQL Statement** | Any CRUD operation       |
| **SQL Query**     | Read-only, retrieve data |

---

### The SELECT Statement

Simplest query:

```sql
SELECT * FROM my_table;
```

* `SELECT` → choose columns
* `*` → all columns
* `FROM` → specify table

SQL keywords are case-insensitive.

#### Filtering and Sorting

```sql
SELECT *
FROM my_table
WHERE column1 > 100
ORDER BY column2;
```

#### Clause Order

```sql
SELECT     -- columns to display
FROM       -- table(s)
WHERE      -- filter rows
GROUP BY   -- group rows
HAVING     -- filter groups
ORDER BY   -- sort results
```

💡 Mnemonic: “Start Fridays With Grandma’s Homemade Oatmeal”

#### Execution Order

| Step | Clause   | Description    |
| ---- | -------- | -------------- |
| 1    | FROM     | Gather data    |
| 2    | WHERE    | Filter rows    |
| 3    | GROUP BY | Group rows     |
| 4    | HAVING   | Filter groups  |
| 5    | SELECT   | Choose columns |
| 6    | ORDER BY | Sort output    |

---

### Understanding a Data Model

A **data model** visualizes how tables relate — columns, keys, relationships.

| Term             | Definition                  | Example                             |
| ---------------- | --------------------------- | ----------------------------------- |
| Database         | Container for data          | `student_grades`                    |
| Table            | Rows + columns (relation)   | `Students`, `Grades`                |
| Column           | Data field in table         | `student_id`, `student_name`        |
| Primary Key (PK) | Uniquely identifies row     | `student_id`                        |
| Foreign Key (FK) | Links to another table’s PK | `student_id` in `Grades`            |
| Relationship     | Defines table connections   | One-to-many (`Students` → `Grades`) |

Example: one student can have many grades → **one-to-many relationship**.

---

### Essential SQL Commands

* `SELECT` — extract data
* `INSERT INTO` — insert new data
* `UPDATE` — modify existing data
* `DELETE` — remove data
* `CREATE DATABASE` — create a new database
* `ALTER DATABASE` — modify database
* `CREATE TABLE` — create a table
* `ALTER TABLE` — modify table
* `DROP TABLE` — delete table
* `CREATE INDEX` — create search key
* `DROP INDEX` — delete index

---

### Final Thoughts

You now understand:

✅ What databases and schemas are
✅ SQL vs NoSQL differences
✅ CRUD operations
✅ SELECT statement and clause order
✅ How data models define relationships

Use this as a reference while writing queries or exploring databases.

💬 **Next Article Preview:**
We’ll dive into **Schema Management** — creating, dropping, and modifying databases and tables.

---

**#SQL #Database #Learning #WebDev #Backend #PostgreSQL #MySQL #SQLite**

---

