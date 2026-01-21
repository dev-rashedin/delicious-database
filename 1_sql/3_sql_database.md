# SQL Database Essentials: A Must-Read Guide for Every Developer (Part 3)

## Focused on SQL Database Management (All Examples from w3schools)

This article covers the core concepts of SQL database creation, modification, backup, and table management. It is a practical reference for developers to understand database structure, constraints, and administration using SQL commands. Whether you're a newbie, seasoned, or expert developer, this guide can help you strengthen your understanding of SQL database fundamentals and improve your practical skills. You can use it as a learning tool if you're a beginner, or as a quick reference to refresh and reinforce your SQL knowledge.


## Create a Database

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


## Drop a Database

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



## Backup a Database

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


### Database Backup commands for other major relational database management systems -

- **PostgreSQL**

```bash
# Logical backup\pg_dump -U username -d dbname > backup.sql
```

Restore:

```bash
psql -U username -d dbname < backup.sql
```

* Uses command-line tool `pg_dump`
* SQL command `BACKUP DATABASE` is not supported

- **MySQL / MariaDB**

```bash
mysqldump -u username -p databasename > backup.sql
```

Restore:

```bash
mysql -u username -p databasename < backup.sql
```

* Uses `mysqldump` command
* Produces a logical SQL dump

- **Oracle Database**

```bash
RMAN> BACKUP DATABASE;
```

* Uses Recovery Manager (RMAN) tool
* Supports full, incremental, and archived log backups

**Note:** Always choose the backup method recommended for your specific RDBMS. SQL Server supports backup via SQL command, while PostgreSQL, MySQL, and Oracle require external tools.



## Create Table in Database (Multi-RDBMS)

> Most commands in this section are standard SQL and conceptually work across major RDBMSs, but syntax may vary slightly.

### The CREATE TABLE statement is used to create a new table in a database.

```sql
-- Standard Syntax
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
    ....
);

-- Example (Generic)
CREATE TABLE Persons (
    PersonID INT PRIMARY KEY,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Address VARCHAR(255),
    City VARCHAR(255)
);
```

**Notes per RDBMS:**

* **MySQL / MariaDB / PostgreSQL / SQL Server:** works as above; for auto-increment, use `AUTO_INCREMENT` (MySQL/SQL Server) or `SERIAL` (PostgreSQL).

* **Oracle:** use `VARCHAR2` instead of `VARCHAR`, `NUMBER` instead of `INT`, `GENERATED AS IDENTITY` for auto-increment.

* Column parameters specify the names of the columns.

* Datatype parameter specifies the type of data the column can hold.

* Optional constraints: PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT.

* Can include composite primary keys or foreign key references.

## Drop a Table from Database

### DROP TABLE

```sql
-- Standard Syntax
DROP TABLE table_name;
```

**Notes per RDBMS:**

* Most RDBMSs support this. Add `IF EXISTS` in MySQL/PostgreSQL/SQL Server to avoid errors if table does not exist.
* Deletes the table and all its data permanently.

### TRUNCATE TABLE

```sql
-- Standard Syntax
TRUNCATE TABLE table_name;
```

**Notes per RDBMS:**

* Quickly deletes all records.
* Rollback behavior varies: PostgreSQL and SQL Server can rollback inside a transaction; MySQL may not (depending on storage engine); Oracle supports rollback.
* Some DBMSs fire triggers on `TRUNCATE`, some do not.

## Modify a Database

The `ALTER TABLE` statement allows you to modify the structure of an existing table without deleting it. Common operations include adding, dropping, renaming, or altering columns.

### Add a column

```sql
ALTER TABLE table_name
ADD column_name datatype;
```

* Works across all major RDBMSs with standard syntax.

### Drop a column

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

* Works in most RDBMSs; some may require additional options.

### Rename a column

**Syntax per RDBMS:**

* PostgreSQL / Oracle: `ALTER TABLE table_name RENAME COLUMN old_name TO new_name;`
* MySQL: `ALTER TABLE table_name CHANGE old_name new_name datatype;`
* SQL Server: `EXEC sp_rename 'table_name.old_name', 'new_name', 'COLUMN';`

### Modify a column's datatype

**Syntax per RDBMS:**

* PostgreSQL: `ALTER TABLE table_name ALTER COLUMN column_name TYPE new_datatype;`
* MySQL: `ALTER TABLE table_name MODIFY COLUMN column_name new_datatype;`
* SQL Server: `ALTER TABLE table_name ALTER COLUMN column_name new_datatype;`
* Oracle: `ALTER TABLE table_name MODIFY column_name new_datatype;`

### Tips & Best Practices

* Always **back up the table** before making structural changes.
* Ensure **data compatibility** when modifying a column's datatype.
* Check for **constraints, indexes, or foreign keys** that may be affected by dropping or renaming columns.
* Consider **performance impact**: altering large tables may take time and should ideally be done during low-traffic periods.



## CONSTRAINTS

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
