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


