## SQL CREATE INDEX Statement

Indexes improve query performance by allowing faster searches.  

### CREATE INDEX

```sql
-- MySQL / PostgreSQL / SQL Server / Oracle / MS Access
CREATE INDEX idx_lastname
ON Persons (LastName);

-- Multiple columns
CREATE INDEX idx_fullname
ON Persons (LastName, FirstName);
```

### CREATE UNIQUE INDEX

```sql
-- MySQL / PostgreSQL / SQL Server / Oracle / MS Access
CREATE UNIQUE INDEX idx_unique_person
ON Persons (ID);
```

### DROP INDEX

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
ALTER TABLE Persons AUTO_INCREMENT = 100; -- set starting value
INSERT INTO Persons (FirstName, LastName) VALUES ('Lars','Monsen');


-- PostgreSQL Example
CREATE TABLE Persons (
    PersonID SERIAL PRIMARY KEY,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INT
);
INSERT INTO Persons (FirstName, LastName) VALUES ('Lars','Monsen');
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
