# SQL advance queries

- Subqueries

- JOINs (INNER, LEFT, RIGHT, FULL)

- EXISTS

- CASE

- Transactions (BEGIN / COMMIT / ROLLBACK)

Here’s a concise, language-agnostic section for **SQL Dates** using only MySQL, PostgreSQL, and SQLite examples. It follows your previous format and is ready for copy/paste in a markdown-friendly style:


## SQL Dates

When working with dates, the key is to ensure that the format of the data matches the column type in your database. Queries work reliably as long as your date values match the column format.

### SQL Date Data Types

**MySQL / PostgreSQL / SQLite:**

- `DATE` — stores date only (format `YYYY-MM-DD`)
- `DATETIME` — stores date and time (format `YYYY-MM-DD HH:MI:SS`)
- `TIMESTAMP` — stores date and time (MySQL/PostgreSQL: `YYYY-MM-DD HH:MI:SS`; SQLite: same as `DATETIME`)

> Note: Choose the appropriate type when creating a table column.

### Working with Dates

Assume we have an `Orders` table:

| OrderId | ProductName          | OrderDate           |
|---------|--------------------|-------------------|
| 1       | Geitost             | 2008-11-11        |
| 2       | Camembert Pierrot   | 2008-11-09        |
| 3       | Mozzarella di Giovanni | 2008-11-11     |
| 4       | Mascarpone Fabioli  | 2008-10-29        |

To select orders on `2008-11-11`:

```sql
SELECT * FROM Orders
WHERE OrderDate = '2008-11-11';
````

**Result:**

| OrderId | ProductName            | OrderDate  |
| ------- | ---------------------- | ---------- |
| 1       | Geitost                | 2008-11-11 |
| 3       | Mozzarella di Giovanni | 2008-11-11 |

> Two dates can easily be compared if there is no time component.

If the table contains a time component:

| OrderId | ProductName       | OrderDate           |
| ------- | ----------------- | ------------------- |
| 1       | Geitost           | 2008-11-11 13:23:44 |
| 2       | Camembert Pierrot | 2008-11-09 15:45:21 |
Continuing the section for SQL Dates:
| 3       | Mozzarella di Giovanni | 2008-11-11 11:12:01 |
| 4       | Mascarpone Fabioli    | 2008-10-29 14:56:59 |

If you run the same query as before:

```sql
SELECT * FROM Orders
WHERE OrderDate = '2008-11-11';
````

You will get **no results**, because the query only matches exact date values with no time component.

### Tips

* To keep queries simple and maintainable, **avoid using time components** in date columns unless necessary.
* Use date functions when working with time components:

  * **MySQL / PostgreSQL:** `DATE(OrderDate) = '2008-11-11'`
  * **SQLite:** `DATE(OrderDate) = '2008-11-11'`
* Always be aware of the **time zone** if using `TIMESTAMP` columns in MySQL/PostgreSQL.

### Creating Tables with Dates

```sql
-- MySQL / PostgreSQL / SQLite
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    OrderDate DATE
);

-- With datetime
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    OrderDate DATETIME
);
```
