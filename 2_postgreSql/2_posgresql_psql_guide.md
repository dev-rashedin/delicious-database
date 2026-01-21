# PostgreSQL psql Terminal Guide: A Complete Command Reference

> A practical, developer-focused guide to working with PostgreSQL using the **psql terminal**.
> This article explains **psql meta-commands**, core SQL commands, and real-world workflows.

---

## What is `psql`?

`psql` is PostgreSQL’s **interactive command-line client**. It allows you to:

* Connect to PostgreSQL servers
* Run SQL queries
* Execute PostgreSQL-specific meta-commands
* Inspect databases, tables, users, and schemas

`psql` supports **two types of commands**:

1. **SQL commands** (standard SQL)
2. **psql meta-commands** (start with `\`, client-side shortcuts)

---

## Connecting to PostgreSQL

```bash
psql -U username -d database_name
```

Common connection options:

* `-U` → username
* `-d` → database name
* `-h` → host
* `-p` → port

Example:

```bash
psql -U postgres -d mydb -h localhost -p 5432
```

---

## Database-Level Commands

### List all databases

```sql
\l
```

* psql meta-command
* Lists all databases on the server

SQL alternative:

```sql
SELECT datname FROM pg_database;
```

---

### Connect to a database

```sql
\c database_name
```

* Switches connection without restarting `psql`

---

### Create a database

```sql
CREATE DATABASE mydb;
```

---

### Drop a database

```sql
DROP DATABASE mydb;
```

* You cannot drop the database you are currently connected to

---

## User & Role Management

### List roles

```sql
\du
```

---

### Create a role

```sql
CREATE ROLE dev_user LOGIN PASSWORD 'password';
```

---

### Grant privileges

```sql
GRANT ALL PRIVILEGES ON DATABASE mydb TO dev_user;
```

---

## Table & Schema Inspection

### List tables

```sql
\dt
```

* Shows tables in the current schema

---

### List tables across all schemas

```sql
\dt *.*
```

---

### Describe a table

```sql
\d table_name
```

* Shows columns, data types, constraints, and indexes

---

### Detailed table description

```sql
\d+ table_name
```

* Includes storage size and additional metadata

---

### List schemas

```sql
\dn
```

---

## Working with Data

### Run a SELECT query

```sql
SELECT * FROM users;
```

---

### Insert data

```sql
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
```

---

### Update data

```sql
UPDATE users SET name = 'Bob' WHERE id = 1;
```

---

### Delete data

```sql
DELETE FROM users WHERE id = 1;
```

---

## Transaction Control

### Start a transaction

```sql
BEGIN;
```

---

### Commit changes

```sql
COMMIT;
```

---

### Rollback changes

```sql
ROLLBACK;
```

---

## Indexes

### List indexes

```sql
\di
```

---

### Create an index

```sql
CREATE INDEX idx_users_email ON users(email);
```

---

## Extensions

### List installed extensions

```sql
\dx
```

---

### Install an extension

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

---

## File & Script Execution

### Run a SQL file

```sql
\i path/to/file.sql
```

* Executes all SQL commands in the file

---

## Output & Formatting

### Toggle expanded display

```sql
\x
```

* Useful for wide tables

---

### Change output format

```sql
\pset format aligned
\pset format csv
```

---

## Help & Documentation

### psql command help

```sql
\?
```

---

### SQL command help

```sql
\h SELECT
```

---

## Exit psql

```sql
\q
```

---

## Best Practices When Using psql

* Use `\d` commands to explore schema before writing queries
* Prefer transactions (`BEGIN`) for destructive operations
* Avoid running `DROP` or `TRUNCATE` without double-checking
* Use SQL files (`\i`) for repeatable scripts

---

## Final Notes

`psql` is one of the most powerful ways to interact with PostgreSQL. Mastering it gives you **deep insight into database internals**, improves debugging skills, and makes you faster and more confident as a backend developer.

This guide can be used as:

* A **learning resource** for PostgreSQL beginners
* A **daily reference** for working developers
* A **revision tool** for interviews and production work
