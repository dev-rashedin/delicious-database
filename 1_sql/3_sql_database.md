## All the examples here are from w3schools

### The CREATE DATABASE statement is used to create a new SQL database.

```sql
-- Syntax
CREATE DATABASE databasename;

-- Example
CREATE DATABASE testDB;
```

> Creates a new database. Only works if you have permission on the server. Once a database is created, you can check it in the list of databases with the following SQL command: SHOW DATABASES;

### The DROP DATABASE statement is used to drop an existing SQL database.

```sql
-- Syntax
DROP DATABASE databasename;

-- Example
DROP DATABASE testDB;
```

> Deletes the database and all its tables and data. Cannot drop a database you are connected to. Only works if you have permission on the server. Once a database is dropped, you can check it in the list of databases with the following SQL command: SHOW DATABASES;


### The BACKUP DATABASE statement is used in SQL Server to create a full backup of an existing SQL database.

```sql
-- Syntax
BACKUP DATABASE databasename
TO DISK = 'filepath';

-- Example
BACKUP DATABASE testDB 
TO DISK = 'D:\backups\testDB.bak';
```

> Creates a full backup of the database. It's recommended to back up the database to a different drive than the actual database. Then, if you get a disk crash, you will not lose your backup file along with the database.


### The following SQL statement creates a differential backup of the database "testDB":

```sql
-- Example
BACKUP DATABASE testDB
TO DISK = 'D:\backups\testDB.bak'
WITH DIFFERENTIAL;
```

> Backs up only the changes since the last full backup, reducing backup time.



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

> The column parameters specify the names of the columns of the table. The datatype parameter specifies the type of data the column can hold (e.g., VARCHAR, INTEGER, DATE, etc.). This defines columns, data types, and optional constraints such as PRIMARY KEY, NOT NULL, UNIQUE, or DEFAULT.


### The DROP TABLE statement is used to drop an existing table in a database.

```sql
-- Syntax
DROP TABLE table_name;

-- Example
DROP TABLE Shippers;
```

> Deletes the table and all its data permanently.

### The TRUNCATE TABLE statement is used to delete the data inside a table, but not the table itself.

```sql
-- Syntax
TRUNCATE TABLE table_name;

-- Example
TRUNCATE TABLE Shippers;
```

> Quickly deletes all records; cannot be rolled back in some databases.

### The ALTER TABLE statement is used to modify an existing table.

> Can add, modify, or drop columns, add constraints, rename tables, and more.

### CONSTRAINTS

* **NOT NULL**: Ensures a column cannot be NULL.
* **UNIQUE**: All values in a column must be unique.
* **PRIMARY KEY**: Uniquely identifies each row.
* **FOREIGN KEY**: Maintains referential integrity.
* **CHECK**: Enforces a condition on column values.
* **DEFAULT**: Provides a default value if none is specified.

### INDEX

> Used to speed up queries by allowing faster searches on columns.

### AUTO INCREMENT / SERIAL

> Automatically generates unique numbers for new rows.

### VIEWS

> Virtual tables based on query results; useful for reusable complex queries.

### DATA TYPES

> INT, BIGINT, FLOAT, DECIMAL, CHAR, VARCHAR, TEXT, DATE, TIME, TIMESTAMP, BOOLEAN, etc.

### DATES

> Handling and formatting dates, using functions like CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP.

### SQL INJECTION

> Security vulnerability where attackers manipulate queries. Use parameterized queries to prevent.

### HOSTING / CONNECTION

> Databases can be local (PostgreSQL/MySQL) or cloud-hosted (Supabase, Neon, AWS RDS).
