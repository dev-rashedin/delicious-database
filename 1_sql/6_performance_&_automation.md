## SQL CREATE INDEX Statement

Indexes improve query performance by allowing faster searches.  

### CREATE INDEX Statement (Allows duplicate values)

```sql
-- Syntax
CREATE INDEX index_name
ON table_name (column1, column2, ...);

-- Example: Single column
CREATE INDEX idx_lastname
ON Persons (LastName);

-- Example: Multiple columns
CREATE INDEX idx_fullname
ON Persons (LastName, FirstName);
```

### CREATE UNIQUE INDEX (No duplicate value)

```sql
-- Syntax
CREATE UNIQUE INDEX index_name
ON table_name (column1, column2, ...);

CREATE UNIQUE INDEX idx_unique_person
ON Persons (ID);
```

### DROP INDEX Statement

```sql
-- MySQL
ALTER TABLE Persons
DROP INDEX idx_lastname;

-- PostgreSQL / Oracle / DB2
DROP INDEX idx_lastname;

-- SQL Server
DROP INDEX Persons.idx_lastname;

-- MS Access
DROP INDEX idx_lastname ON Persons;
```

** Notes **
* Updating a table with indexes takes more time than updating a table without (because the indexes also need an update).
* So, only create indexes on columns that will be frequently searched against.


## AUTO_INCREMENT / SERIAL Field

Auto-increment fields allow a unique number to be generated automatically when a new record is inserted. Typically used for primary key columns.

```sql
--  MySQL Example
CREATE TABLE Persons (
    PersonID int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (PersonID)
);

-- By default, the starting value for AUTO_INCREMENT is 1, and it will increment by 1 for each new record.

-- To let the AUTO_INCREMENT sequence start with another value, use the following SQL statement:

ALTER TABLE Persons AUTO_INCREMENT = 100; -- set starting value


-- PostgreSQL Example
CREATE TABLE Persons (
    PersonID SERIAL PRIMARY KEY,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INT
);

-- SQL Server
CREATE TABLE Persons (
    Personid int IDENTITY(1,1) PRIMARY KEY,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int
);

-- To specify that the "Personid" column should start at value 10 and increment by 5, change it to IDENTITY(10,5).
```

** Notes **
* Auto-increment fields are often used as primary keys.
* You do not need to provide a value for auto-increment columns when inserting.
* Starting value and increment step can be customized using sequences in PostgreSQL.


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


## Plan
   - Indexes
   - Identity / Serial / Auto-Increment
   - Query planning concepts
