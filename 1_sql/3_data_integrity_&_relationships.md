## Constraints

SQL constraints define rules that enforce **data integrity and consistency** within a database. They control what values can be stored in a table and prevent invalid data from being inserted, updated, or deleted.

Constraints can be defined:
- **At table creation time** using the `CREATE TABLE` statement
- **After table creation** using the `ALTER TABLE` statement

Constraints may be applied at two levels:
- **Column-level constraints**: Apply to a single column
- **Table-level constraints**: Apply to the entire table and may involve multiple columns

When a constraint is violated, the database **rejects the operation**, ensuring the accuracy and reliability of stored data.

### Common SQL Constraints

* **NOT NULL** — Prevents a column from storing `NULL` values.
* **UNIQUE** — Ensures all values in a column (or set of columns) are distinct.
* **PRIMARY KEY** — Uniquely identifies each row in a table.
* **FOREIGN KEY** — Maintains referential integrity between related tables.
* **CHECK** — Enforces a condition that column values must satisfy.
* **DEFAULT** — Assigns a default value when no value is provided.
* **INDEX** — Improves query performance by speeding up data retrieval.


## SQL NOT NULL Constraint

By default, a column can accept `NULL` values.  
The `NOT NULL` constraint enforces that a column **must always have a value**.

This means you cannot insert a new row or update an existing row without providing a value for a `NOT NULL` column.

### NOT NULL with CREATE TABLE

```sql
CREATE TABLE Persons (
    ID INT NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    Age INT
);
```

### NOT NULL with ALTER TABLE

```sql
-- SQL Server / MS Access
ALTER TABLE Persons
ALTER COLUMN Age INT NOT NULL;

-- MySQL
ALTER TABLE Persons
MODIFY COLUMN Age INT NOT NULL;

-- PostgreSQL
ALTER TABLE Persons
ALTER COLUMN Age SET NOT NULL;

-- Oracle (10g and later)
ALTER TABLE Persons
MODIFY Age INT NOT NULL;
```

* Ensures mandatory fields always contain data.
* Commonly used for identifiers, names, and critical attributes.
* Helps prevent incomplete or invalid records.

## SQL UNIQUE Constraint

The `UNIQUE` constraint ensures that **all values in a column (or combination of columns) are distinct**.

Both `UNIQUE` and `PRIMARY KEY` enforce uniqueness:
- A table can have **multiple UNIQUE constraints**
- A table can have **only one PRIMARY KEY**
- A `PRIMARY KEY` automatically includes a `UNIQUE` constraint

### UNIQUE with CREATE TABLE (Single Column)

```sql
-- SQL Server / Oracle / MS Access
CREATE TABLE Persons (
    ID INT NOT NULL UNIQUE,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INT
);

-- MySQL // PostgreSQL
CREATE TABLE Persons (
    ID INT NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INT,
    UNIQUE (ID)
);
```

### UNIQUE with CREATE TABLE (Multiple Columns)

```sql
CREATE TABLE Persons (
    ID INT NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INT,
    CONSTRAINT UC_Person UNIQUE (ID, LastName)
);
```

* Prevents duplicate values in critical columns.
* Supports **composite uniqueness** across multiple columns.
* Commonly used for emails, usernames, or business identifiers.



## SQL PRIMARY KEY Constraint

The PRIMARY KEY constraint uniquely identifies each record in a table.  
Primary keys must contain **unique values** and **cannot be NULL**. Each table can have only **one primary key**. The primary key can be a single column or a combination of columns.

### PRIMARY KEY with CREATE TABLE

```sql
-- MySQL / PostgreSQL (single column)
CREATE TABLE Persons (
    ID INT NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INT,
    PRIMARY KEY (ID)
);

-- SQL Server / Oracle / MS Access
CREATE TABLE Persons (
    ID INT NOT NULL PRIMARY KEY,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INT
);

-- PRIMARY KEY on multiple columns (MySQL / PostgreSQL / SQL Server / Oracle / MS Access)
CREATE TABLE Persons (
    ID INT NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INT,
    CONSTRAINT PK_Person PRIMARY KEY (ID, LastName)
);
```

### PRIMARY KEY with ALTER TABLE

```sql
-- Add single column primary key (MySQL / PostgreSQL / SQL Server / Oracle / MS Access)
ALTER TABLE Persons
ADD PRIMARY KEY (ID);

-- Add composite primary key
ALTER TABLE Persons
ADD CONSTRAINT PK_Person PRIMARY KEY (ID, LastName);
```

*Note:* Columns must be defined as NOT NULL when adding primary key via ALTER TABLE.

### DROP PRIMARY KEY Constraint

```sql
-- MySQL / PostgreSQL
ALTER TABLE Persons
DROP PRIMARY KEY;

-- SQL Server / Oracle / MS Access
ALTER TABLE Persons
DROP CONSTRAINT PK_Person;
```

## SQL FOREIGN KEY Constraint

The FOREIGN KEY constraint enforces **referential integrity** between tables.  
A FOREIGN KEY in a child table references the PRIMARY KEY in a parent table, preventing invalid data entry.

### FOREIGN KEY with CREATE TABLE

```sql
-- MySQL / PostgreSQL
CREATE TABLE Orders (
    OrderID INT NOT NULL,
    OrderNumber INT NOT NULL,
    PersonID INT,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);

-- SQL Server / Oracle / MS Access
CREATE TABLE Orders (
    OrderID INT NOT NULL PRIMARY KEY,
    OrderNumber INT NOT NULL,
    PersonID INT FOREIGN KEY REFERENCES Persons(PersonID)
);

-- Named or composite foreign key (MySQL / PostgreSQL / SQL Server / Oracle / MS Access)
CREATE TABLE Orders (
    OrderID INT NOT NULL,
    OrderNumber INT NOT NULL,
    PersonID INT,
    PRIMARY KEY (OrderID),
    CONSTRAINT FK_PersonOrder FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);
```

### FOREIGN KEY with ALTER TABLE

```sql
-- Add foreign key to existing table
-- MySQL / PostgreSQL / SQL Server / Oracle / MS Access
ALTER TABLE Orders
ADD FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);

-- Add named foreign key
ALTER TABLE Orders
ADD CONSTRAINT FK_PersonOrder
FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);
```

### DROP FOREIGN KEY Constraint

```sql
-- MySQL / PostgreSQL
ALTER TABLE Orders
DROP FOREIGN KEY FK_PersonOrder;

-- SQL Server / Oracle / MS Access
ALTER TABLE Orders
DROP CONSTRAINT FK_PersonOrder;
```

*Notes:*  
- Always ensure referenced columns exist and are PRIMARY KEY or UNIQUE.  
- Foreign keys maintain data integrity and prevent orphaned records.



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
