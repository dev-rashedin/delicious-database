# 🐘 PostgreSQL Pocket Guide for Beginners

Welcome to your quick, beginner-friendly SQL reference for PostgreSQL!
This guide walks you through **creating databases**, **tables**, **inserting data**, **querying**, **updating**, and **deleting** — all with short explanations and practical examples.

---

## 🏁 1. Create and Connect to a Database

A **database** stores your tables, which hold your structured data.

```sql
CREATE DATABASE demo;
```

Once created, connect to it using PgAdmin or the `\c demo` command in the terminal.

To view existing tables:

```sql
SELECT * FROM information_schema.tables;
```

---

## 📋 2. Create a Table

A **table** holds your data in rows and columns.
Each column has a specific **data type** like `INT`, `VARCHAR`, `FLOAT`, or `DATE`.

```sql
CREATE TABLE products
(
    id INT,
    name VARCHAR(50),
    price FLOAT,
    release_date DATE
);
```

---

## 🧱 3. Primary Keys and Constraints

A **primary key** uniquely identifies each row in a table.
You can define it in multiple ways:

```sql
CREATE TABLE products
(
    id INT PRIMARY KEY,
    name VARCHAR(50),
    price FLOAT,
    release_date DATE
);
```

Or using a named constraint:

```sql
CREATE TABLE products
(
    id INT,
    name VARCHAR(50),
    price FLOAT,
    release_date DATE,
    CONSTRAINT pk_prd PRIMARY KEY (id)
);
```

Or even a **composite key** (multiple columns together):

```sql
CREATE TABLE products
(
    id INT,
    name VARCHAR(50),
    price FLOAT,
    release_date DATE,
    CONSTRAINT pk_prd PRIMARY KEY (id, name)
);
```

> 🧩 Composite keys ensure uniqueness across combinations of columns, not just one.

---

## 🔢 4. Auto-Incrementing IDs

Use an **identity column** to let PostgreSQL auto-generate IDs.

```sql
CREATE TABLE products
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50),
    price FLOAT,
    release_date DATE
);
```

> The `GENERATED ALWAYS AS IDENTITY` clause ensures each new row gets a unique `id`.

---

## 🪣 5. Insert Data

Insert new rows using `INSERT INTO`.
Use `TO_DATE()` for proper date conversion.

```sql
INSERT INTO products (id, name, price, release_date) 
VALUES (DEFAULT, 'iPhone 15', 900, TO_DATE('22-08-2023', 'DD-MM-YYYY'));

INSERT INTO products (id, name, price, release_date) 
VALUES (DEFAULT, 'Macbook Pro', 2000, TO_DATE('10-02-2021', 'DD-MM-YYYY'));

INSERT INTO products (id, name, price, release_date) 
VALUES (DEFAULT, 'AirPods', 400, TO_DATE('15-04-2022', 'DD-MM-YYYY'));
```

---

## 🔍 6. Query (Read) Data

Fetch data using `SELECT`.

### Get all rows and columns

```sql
SELECT * FROM products;
```

### Get filtered results

```sql
SELECT * FROM products
WHERE price > 500;
```

### Select specific columns

```sql
SELECT name FROM products;
```

### Rename a column (alias)

```sql
SELECT name AS product_name FROM products;
```

### Give the table an alias

```sql
SELECT p.name AS product_name FROM products p;
```

### Filter by release year

```sql
SELECT name FROM products
WHERE EXTRACT(YEAR FROM release_date) = 2023;
```

### Count total products

```sql
SELECT COUNT(*) FROM products;
```

### Get average and total price

```sql
SELECT AVG(price) AS avg_price, SUM(price) AS total_price
FROM products;
```

---

## ✏️ 7. Update Data

Modify existing rows with `UPDATE`.

```sql
UPDATE products
SET price = 1000
WHERE name = 'iPhone 15';
```

Or with a partial match:

```sql
UPDATE products
SET price = 1200
WHERE name LIKE 'iPhone%';
```

---

## 🗑️ 8. Delete Data

Remove rows using `DELETE`.

```sql
DELETE FROM products
WHERE price > 1000;
```

Delete everything except specific items:

```sql
DELETE FROM products
WHERE name NOT LIKE 'iPhone%';
```

Delete all rows:

```sql
DELETE FROM products;
```

Or quickly empty the table (faster):

```sql
TRUNCATE TABLE products;
```

> ⚠️ `DELETE` removes specific rows, `TRUNCATE` clears all rows, and `DROP` removes the table itself.

---

## 💾 9. Backup and Copy Tables

Create a backup copy of a table.

```sql
CREATE TABLE products_backup AS
SELECT * FROM products;
```

Create a structure-only copy:

```sql
CREATE TABLE products_backup2 AS
SELECT * FROM products
WHERE 1 = 2;
```

---

## ⚙️ 10. Modify Tables

### Rename a table

```sql
ALTER TABLE products RENAME TO products_new;
```

### Rename a column

```sql
ALTER TABLE products RENAME COLUMN name TO product_name;
```

### Change a column’s data type

```sql
ALTER TABLE products ALTER COLUMN price TYPE INT;
```

---

## 🔗 11. Foreign Keys (Relationships)

A **foreign key** links two tables together.
Let’s create an `orders` table that references the `products` table.

```sql
CREATE TABLE sales_order
(
    order_id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_date DATE,
    quantity   INT,
    prod_id    INT REFERENCES products(id),
    status     VARCHAR(30)
);
```

> This creates a **secondary constraint** ensuring each `prod_id` exists in the `products` table.

---

## 🔄 12. Drop (Remove) Tables

Remove a table permanently:

```sql
DROP TABLE products;
```

Drop only if it exists:

```sql
DROP TABLE IF EXISTS products;
```

---

## 🧮 13. Bonus: Quick Reference

| Command           | Purpose               |
| ----------------- | --------------------- |
| `CREATE DATABASE` | Create a new database |
| `CREATE TABLE`    | Create a new table    |
| `INSERT INTO`     | Add new rows          |
| `SELECT`          | Read data             |
| `UPDATE`          | Modify data           |
| `DELETE`          | Remove rows           |
| `TRUNCATE`        | Empty a table         |
| `ALTER TABLE`     | Change structure      |
| `DROP TABLE`      | Remove a table        |

---

## 🚀 Wrap-up

You’ve just learned the **core SQL operations in PostgreSQL** — from creating databases and tables to manipulating and querying data.

This pocket guide is perfect for:

* Students learning SQL for the first time
* Developers working with PostgreSQL
* Quick reference during interviews or projects

> 💡 Tip: Practice each section in `pgAdmin` or `psql` to build real-world confidence!

---

**Author:** Rashedin Islam
**Tags:** #PostgreSQL #SQL #Database #LearningSQL #DataEngineering
