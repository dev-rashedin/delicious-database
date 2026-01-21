# SQL Database Essentials: A Must-Read Guide for Every Developer (Part 3)

## Focused on SQL Database Management (All Examples from w3schools)

This article covers the core concepts of SQL database creation, modification, backup, and table management. It is a practical reference for developers to understand database structure, constraints, and administration using SQL commands. Whether you're a newbie, seasoned, or expert developer, this guide can help you strengthen your understanding of SQL database fundamentals and improve your practical skills. You can use it as a learning tool if you're a beginner, or as a quick reference to refresh and reinforce your SQL knowledge.


### The CREATE DATABASE statement is used to create a new SQL database.

```sql
-- Syntax
CREATE DATABASE databasename;

-- Example
CREATE DATABASE testDB;
```

* Creates a new database. Only works if you have permission on the server.
* Once a database is created, you can verify it using:
  - **MySQL / MariaDB**: `SHOW DATABASES;`
  - **PostgreSQL**: `\l` (psql) or `SELECT datname FROM pg_database;`
  - **SQL Server**: `SELECT name FROM sys.databases;`
  - **Oracle**: `SELECT name FROM v$database;`

### The DROP DATABASE statement is used to drop an existing SQL database.

```sql
-- Syntax
DROP DATABASE databasename;

-- Example
DROP DATABASE testDB;
```

* Deletes the database and all its tables and data.
* Cannot drop a database you are connected to.
* Only works if you have permission on the server.
* Once a database is dropped, you can verify it using:
  - **MySQL / MariaDB**: `SHOW DATABASES;`
  - **PostgreSQL**: `\l` (psql) or `SELECT datname FROM pg_database;`
  - **SQL Server**: `SELECT name FROM sys.databases;`
  - **Oracle**: `SELECT name FROM v$database;`
  

### The BACKUP DATABASE statement is used in SQL Server to create a full backup of an existing SQL database.

```sql
-- Syntax
BACKUP DATABASE databasename
TO DISK = 'filepath';

-- Example
BACKUP DATABASE testDB 
TO DISK = 'D:\backups\testDB.bak';
```

* Creates a full backup of the database.
* Recommended to back up the database to a different drive than the actual database.
* Prevents losing both the database and backup in case of a disk crash.

### Differential Backup

```sql
-- Example
BACKUP DATABASE testDB
TO DISK = 'D:\backups\testDB.bak'
WITH DIFFERENTIAL;
```

* Backs up only the changes since the last full backup.
* Reduces backup time.

### The CREATE TABLE statement is used to create a new table in a database.

```sql
-- Syntax
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
    ....
);

-- Example
CREATE TABLE Persons (
    PersonID int PRIMARY KEY,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);
```

* Column parameters specify the names of the columns.
* Datatype parameter specifies the type of data the column can hold (e.g., VARCHAR, INTEGER, DATE, etc.).
* Optional constraints: PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT.
* Can include **composite primary keys** or **foreign key references**.

### The DROP TABLE statement is used to drop an existing table in a database.

```sql
-- Syntax
DROP TABLE table_name;

-- Example
DROP TABLE Shippers;
```

* Deletes the table and all its data permanently.

### The TRUNCATE TABLE statement is used to delete the data inside a table, but not the table itself.

```sql
-- Syntax
TRUNCATE TABLE table_name;

-- Example
TRUNCATE TABLE Shippers;
```

* Quickly deletes all records.
* Cannot be rolled back in some databases.



### The ALTER TABLE Statement: Modifying Existing Tables

The `ALTER TABLE` statement allows you to modify the structure of an existing table without deleting it. Common operations include adding, dropping, renaming, or altering columns.

* **Add a column**

```sql
-- Syntax
ALTER TABLE table_name
ADD column_name datatype;

-- Example
ALTER TABLE Customers
ADD Email varchar(255);
```

* **Drop a column**

```sql
-- Syntax
ALTER TABLE table_name 
DROP COLUMN column_name;

-- Example
ALTER TABLE Customers
DROP COLUMN Email;
```

* **Rename a column**

```sql
-- Syntax
ALTER TABLE table_name
RENAME COLUMN old_name TO new_name;

-- Example
ALTER TABLE Customers
RENAME COLUMN Customer_number TO customer_id;
```

* **Modify a column's datatype**

```sql
-- Syntax (PostgreSQL)
ALTER TABLE table_name
ALTER COLUMN column_name TYPE new_datatype;

-- Syntax (MySQL)
ALTER TABLE table_name
MODIFY COLUMN column_name new_datatype;

-- Example (PostgreSQL)
ALTER TABLE Customers
ALTER COLUMN customer_id TYPE INT;

-- Example (MySQL)
ALTER TABLE Customers
MODIFY COLUMN customer_id INT;
```

* **Tips & Best Practices**

  * Always **back up the table** before making structural changes.
  * Ensure **data compatibility** when modifying a column's datatype; incompatible data may cause errors.
  * Check for **constraints, indexes, or foreign keys** that may be affected by dropping or renaming columns.
  * Consider **performance impact**: altering large tables may take time and should ideally be done during low-traffic periods.





### CONSTRAINTS

* **NOT NULL**: Ensures a column cannot be NULL.
* **UNIQUE**: All values in a column must be unique.
* **PRIMARY KEY**: Uniquely identifies each row.
* **FOREIGN KEY**: Maintains referential integrity.
* **CHECK**: Enforces a condition on column values.
* **DEFAULT**: Provides a default value if none is specified.

### INDEX

* Used to speed up queries by allowing faster searches on columns.
* Can be UNIQUE or regular.
* Example: `CREATE INDEX idx_name ON table_name(column_name);`

### AUTO INCREMENT / SERIAL

* Automatically generates unique numbers for new rows.
* MySQL: `AUTO_INCREMENT`, PostgreSQL: `SERIAL` or `BIGSERIAL`.

### VIEWS

* Virtual tables based on query results.
* Useful for reusable complex queries.
* Some views are read-only.

### DATA TYPES

* INT, BIGINT, FLOAT, DECIMAL, CHAR, VARCHAR, TEXT, DATE, TIME, TIMESTAMP, BOOLEAN, etc.

### DATES

* Handling and formatting dates.
* Functions: `CURRENT_DATE`, `CURRENT_TIME`, `CURRENT_TIMESTAMP`.

### SQL INJECTION

* Security vulnerability where attackers manipulate queries.
* Use parameterized queries to prevent.
* Example (safe): `cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))`

### HOSTING / CONNECTION

* Databases can be local (PostgreSQL/MySQL) or cloud-hosted (Supabase, Neon, AWS RDS).
