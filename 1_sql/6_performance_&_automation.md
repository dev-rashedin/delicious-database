
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
