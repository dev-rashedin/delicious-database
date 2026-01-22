## CONSTRAINTS

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
