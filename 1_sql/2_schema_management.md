# Delicious Database (Part 4): SQL for Developers - Schema Management and Data Types

This article covers the core concepts of SQL database creation, modification, backup, table management, and data types. It is a practical reference for developers who want to understand database structure, constraints, and administration using SQL.


This is a DBMS-agnostic article series. However, whenever SQL syntax or examples differ, only **PostgreSQL, MySQL, and SQLite** are included.

You will learn how to:

* Create and delete databases
* Back up databases
* Check which database you are connected to
* Switch between databases
* Create, drop, and modify tables
* Choose appropriate data types


Whether you're a beginner, an intermediate, or an experienced developer, this guide will help you strengthen your understanding of SQL database fundamentals. You can use it both as a learning resource and as a quick reference.


---

## Create Database

The `CREATE DATABASE` statement creates a new database.

```sql
CREATE DATABASE databasename;
```

### Example

```sql
CREATE DATABASE testdb;
```

Notes:

* Requires permission on the server
* Database name must be unique
* The database is empty after creation

---

## Drop Database

The `DROP DATABASE` statement permanently deletes a database.

```sql
DROP DATABASE databasename;
```

### Example

```sql
DROP DATABASE testdb;
```

Notes:

* Deletes all tables and data
* Cannot be undone
* You cannot drop the database you are currently using

---

## Backup Database

PostgreSQL, MySQL, and SQLite do not support `BACKUP DATABASE` as an SQL command. They use external tools.


### PostgreSQL Backup

```bash
pg_dump -U username dbname > backup.sql
```

Restore:

```bash
psql -U username dbname < backup.sql
```

---

### MySQL Backup

```bash
mysqldump -u username -p dbname > backup.sql
```

Restore:

```bash
mysql -u username -p dbname < backup.sql
```

---

### SQLite Backup

```bash
sqlite3 dbname.db ".backup backup.db"
```

Restore:

```bash
cp backup.db dbname.db
```

Notes:

* Always back up before major changes
* Store backups in a different location

---

## Check and Change the Current Database

Before creating tables, you must know **which database you are working in**.

### List All Databases

```sql
-- PostgreSQL
SELECT datname FROM pg_database;
-- Or using terminal
\l

-- MySQL
SHOW DATABASES;

-- SQLite
.databases
```

### Check Current Database

```sql
-- PostgreSQL
SELECT current_database();

-- MySQL
SELECT DATABASE();

-- SQLite
PRAGMA database_list;
```

### Switch / Connect to Another Database

```sql
-- PostgreSQL (psql)
\c dbname

-- MySQL
USE dbname;

-- SQLite
.open dbname.db
```

Always confirm the active database before creating or deleting tables.

---

### Check Database Information

Before creating tables or running queries, it is often useful to know **which database you are connected to** and some basic info about it.

```sql
-- PostgreSQL: Show the current database name
SELECT current_database();  -- Returns the name of the connected database

-- PostgreSQL: Show all databases
\l                        -- Lists all databases (psql terminal shortcut)
-- or using SQL
SELECT datname FROM pg_database;

-- MySQL: Show the current database name
SELECT DATABASE();         -- Returns the name of the connected database

-- MySQL: Show all databases
SHOW DATABASES;

-- SQLite: Show the filename of the current database
PRAGMA database_list;      -- Returns file path and name of attached databases

-- SQLite: List all tables in the current database
.tables                    -- Terminal shortcut to list all tables
```

## Create Table

The `CREATE TABLE` statement defines a new table.

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype
);
```

### Example

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP
);
```

Notes:

* Each column needs a name and data type
* Constraints improve data quality
* Table names should be meaningful

---

## Drop Table

### Drop Entire Table

```sql
DROP TABLE table_name;
```

Deletes the table and all data.

---

### Delete All Rows (Keep Table)

```sql
TRUNCATE TABLE table_name;
```

Notes:

* Faster than `DELETE`
* Cannot always be rolled back
* Resets auto-increment counters

---

## Modify Table (ALTER TABLE)

`ALTER TABLE` changes the structure of a table.

---

### Add Column

```sql
ALTER TABLE table_name
ADD column_name datatype;
```

Example:

```sql
ALTER TABLE users
ADD age INT;
```

---

### Drop Column

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

Example:

```sql
ALTER TABLE users
DROP COLUMN age;
```

---

### Rename Column

```sql
-- PostgreSQL / SQLite
ALTER TABLE table_name RENAME COLUMN old TO new;

-- MySQL
ALTER TABLE table_name CHANGE old new datatype;
```

---

### Change Column Data Type

```sql
-- PostgreSQL
ALTER TABLE table_name
ALTER COLUMN column_name TYPE datatype;

-- MySQL
ALTER TABLE table_name
MODIFY column_name datatype;
```

Notes:

* Existing data must match new type
* Always back up first

---

## SQL Data Types

Every column must have a data type. Data types define:

* What kind of values are allowed
* How much space is used
* How data is processed

Choosing good data types improves:

* Data integrity
* Performance
* Storage efficiency

---

## Common SQL Data Types (RDBMS-Agnostic)

These work similarly in PostgreSQL, MySQL, and SQLite.

| Data Type     | What It Stores     | Beginner Explanation     | Typical Use   | Example                                 |
| ------------- | ------------------ | ------------------------ | ------------- | --------------------------------------- |
| INT / INTEGER | Whole numbers      | No decimal part          | IDs, counters | 42                                      |
| BIGINT        | Very large numbers | For billions+            | Large systems | 9000000000                              |
| DECIMAL(p,s)  | Exact decimals     | p = digits, s = decimals | Money         | 99.99                                   |
| VARCHAR(n)    | Limited text       | Max n characters         | Emails        | [alice@mail.com](mailto:alice@mail.com) |
| TEXT          | Long text          | No fixed limit           | Articles      | Long message                            |
| DATE          | Date only          | Year-month-day           | Birthdate     | 1999-08-15                              |
| TIMESTAMP     | Date + time        | Includes time            | Logs          | 2026-01-24 14:30                        |
| BOOLEAN       | True/False         | Logical value            | Flags         | TRUE                                    |

---

## Auto-Increment / Identity Columns

Used for automatically generated IDs.

| Database   | Syntax              | Explanation          | Example                |
| ---------- | ------------------- | -------------------- | ---------------------- |
| PostgreSQL | SERIAL / IDENTITY   | Auto-increases value | id SERIAL              |
| MySQL      | AUTO_INCREMENT      | Adds 1 per row       | id INT AUTO_INCREMENT  |
| SQLite     | INTEGER PRIMARY KEY | Special auto-ID      | id INTEGER PRIMARY KEY |

---

## Timestamp and Time Zone Handling

| Database   | Type           | Behavior        | Example          |
| ---------- | -------------- | --------------- | ---------------- |
| PostgreSQL | TIMESTAMP      | No timezone     | 2026-01-24 14:30 |
| PostgreSQL | TIMESTAMPTZ    | With timezone   | Auto-adjust      |
| MySQL      | DATETIME       | No timezone     | 2026-01-24 14:30 |
| MySQL      | TIMESTAMP      | UTC based       | Converted        |
| SQLite     | TEXT / INTEGER | Stored as value | "2026-01-24"     |

---

## Boolean Storage Differences

| Database   | Declared Type | Stored As  | Example |
| ---------- | ------------- | ---------- | ------- |
| PostgreSQL | BOOLEAN       | True/False | TRUE    |
| MySQL      | BOOLEAN       | 1 / 0      | 1       |
| SQLite     | BOOLEAN       | 1 / 0      | 0       |

---

## VARCHAR Length Enforcement

| Database   | Enforced | Explanation       |
| ---------- | -------- | ----------------- |
| PostgreSQL | Yes      | Rejects long text |
| MySQL      | Yes      | Throws error      |
| SQLite     | No       | Ignores limit     |

---

## Best Practices

* Always back up before schema changes
* Use meaningful table and column names
* Choose correct data types early
* Avoid changing large tables frequently
* Test changes in development first

---

## Key Takeaways

* Always verify active database
* Use CREATE, DROP, ALTER carefully
* Prefer standard data types
* Understand auto-increment behavior
* Backups are mandatory before changes
