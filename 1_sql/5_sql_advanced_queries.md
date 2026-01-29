# Delicious Database (Part 7): SQL for Developers - Advanced Queries

After mastering basic CRUD operations and fundamental filtering techniques, the next step is learning how to analyze data, combine multiple tables, and write more powerful queries.

This article focuses on **advanced querying techniques** that are essential for building real-world, data-driven applications using PostgreSQL, MySQL, and SQLite.

You will learn how to:

* Group and analyze data using `GROUP BY` and `HAVING`.
* Write nested queries using subqueries.
* Combine data from multiple tables with different types of `JOIN`s.
* Merge result sets using `UNION` and `UNION ALL`.
* Use conditional logic with `CASE`.
* Control query logic using `EXISTS`, `ANY`, and `ALL`.
* Manage data safely using transactions.

All examples are designed to be **portable across PostgreSQL, MySQL, and SQLite**, with differences clearly explained when necessary. By the end of this article, you will be able to write complex, high-performance queries and confidently work with relational data in production systems.


---

## Grouping Data with `GROUP BY`

The `GROUP BY` clause is used to **group rows that share the same values** in one or more columns and turn them into **summary rows**.

It is mainly used together with **aggregate functions** such as:

* `COUNT()`
* `SUM()`
* `AVG()`
* `MIN()`
* `MAX()`

In simple terms:

> `GROUP BY` helps you answer questions like:
>
> * How many users are in each country?
> * What is the total sales per month?
> * What is the average salary per department?

---

### Basic Syntax

```sql
-- Syntax

SELECT column1, aggregate_function(column2)
FROM table_name
WHERE condition
GROUP BY column1
ORDER BY column1;
```

**Execution order (simplified):**

1. `FROM` → Select table
2. `WHERE` → Filter rows
3. `GROUP BY` → Group rows
4. `SELECT` → Apply aggregates
5. `ORDER BY` → Sort result

---

### Example: Count Customers per Country

```sql
-- Example: Count customers in each country

SELECT COUNT(CustomerID) AS TotalCustomers, Country
FROM Customers
GROUP BY Country;
```

**What happens here:**

1. All rows are grouped by `Country`
2. Each country becomes one row
3. `COUNT()` counts customers in each group

**Result:**

| Country | TotalCustomers |
| ------- | -------------- |
| USA     | 13             |
| Germany | 11             |
| Mexico  | 5              |

---

### Sorting Grouped Results

You can sort grouped data using `ORDER BY`.

```sql
-- Example: Countries with most customers first

SELECT COUNT(CustomerID) AS TotalCustomers, Country
FROM Customers
GROUP BY Country
ORDER BY TotalCustomers DESC;
```

This sorts countries from **highest to lowest** customer count.

---

### Using Multiple Columns in `GROUP BY`

You can group by more than one column.

```sql
-- Example: Customers per country and city

SELECT Country, City, COUNT(*) AS TotalCustomers
FROM Customers
GROUP BY Country, City;
```

Now rows are grouped by **both Country and City**.

Each unique `(Country, City)` pair becomes one group.

---

### `GROUP BY` with Other Aggregate Functions

#### Using `SUM()`

```sql
-- Total quantity per order

SELECT OrderID, SUM(Quantity) AS TotalQuantity
FROM OrderDetails
GROUP BY OrderID;
```

#### Using `AVG()`

```sql
-- Average product price per category

SELECT CategoryID, AVG(Price) AS AveragePrice
FROM Products
GROUP BY CategoryID;
```

#### Using `MIN()` and `MAX()`

```sql
-- Lowest and highest price per category

SELECT 
  CategoryID,
  MIN(Price) AS LowestPrice,
  MAX(Price) AS HighestPrice
FROM Products
GROUP BY CategoryID;
```

---

### Important Rule: GROUP BY Columns Must Match SELECT

When using `GROUP BY`:

> Every column in `SELECT` must either:
>
> * Be inside an aggregate function, or
> * Appear in `GROUP BY`

❌ Invalid:

```sql
SELECT Country, City, COUNT(*)
FROM Customers
GROUP BY Country;
```

`City` is not grouped and not aggregated → Error.

✅ Correct:

```sql
SELECT Country, City, COUNT(*)
FROM Customers
GROUP BY Country, City;
```

Or:

```sql
SELECT Country, COUNT(*)
FROM Customers
GROUP BY Country;
```

---

### `GROUP BY` with `WHERE`

Use `WHERE` to filter rows **before grouping**.

```sql
-- Count customers per country (only in Europe)

SELECT Country, COUNT(*) AS TotalCustomers
FROM Customers
WHERE Country IN ('Germany', 'UK', 'France')
GROUP BY Country;
```

Here:

1. `WHERE` filters rows
2. `GROUP BY` groups remaining rows

---

### Common Use Cases of `GROUP BY`

| Use Case                | Example                 |
| ----------------------- | ----------------------- |
| Count users per country | `GROUP BY Country`      |
| Total sales per day     | `GROUP BY OrderDate`    |
| Avg salary per dept     | `GROUP BY DepartmentID` |
| Products per category   | `GROUP BY CategoryID`   |

---

### Key Takeaways

* `GROUP BY` groups rows with the same values
* Used with aggregate functions
* One result row = one group
* Every selected column must be grouped or aggregated
* Works the same in PostgreSQL, MySQL, and SQLite

---

### Mental Model

Think of `GROUP BY` like this:

> "Split the table into buckets, then calculate something for each bucket."

Example:

```
Customers
↓ GROUP BY Country
USA     → COUNT = 13
Germany → COUNT = 11
Mexico  → COUNT = 5
```

---



## Filtering Groups with `HAVING`

The `HAVING` clause is used to **filter grouped results** created by `GROUP BY`.

While `WHERE` filters **rows**,
`HAVING` filters **groups**.

In simple terms:

> * `WHERE` → works **before grouping**
> * `HAVING` → works **after grouping**

You use `HAVING` when you want to apply conditions to **aggregate results** such as `COUNT()`, `SUM()`, or `AVG()`.

---

### Why Do We Need `HAVING`?

Consider this question:

> "Show only countries that have more than 5 customers."

You cannot write:

❌ Invalid:

```sql
SELECT Country, COUNT(*) AS TotalCustomers
FROM Customers
WHERE COUNT(*) > 5
GROUP BY Country;
```

This fails because:

* `WHERE` runs **before** `COUNT()` is calculated
* Aggregate functions do not exist yet at that stage

So SQL provides `HAVING` for this purpose.

✅ Correct:

```sql
SELECT Country, COUNT(*) AS TotalCustomers
FROM Customers
GROUP BY Country
HAVING COUNT(*) > 5;
```

---

### Basic Syntax

```sql
-- Syntax

SELECT column1, aggregate_function(column2)
FROM table_name
WHERE condition
GROUP BY column1
HAVING aggregate_condition
ORDER BY column1;
```

---

### Execution Order (Simplified)

SQL processes grouped queries in this order:

1. `FROM` → Select table
2. `WHERE` → Filter rows
3. `GROUP BY` → Create groups
4. `HAVING` → Filter groups
5. `SELECT` → Display result
6. `ORDER BY` → Sort output

This explains why `HAVING` can use aggregates but `WHERE` cannot.

---

### Example: Countries with More Than 5 Customers

```sql
-- Example: Show only countries with more than 5 customers

SELECT Country, COUNT(*) AS TotalCustomers
FROM Customers
GROUP BY Country
HAVING COUNT(*) > 5;
```

**What happens:**

1. Rows are grouped by `Country`
2. Customers are counted per country
3. Only groups with count > 5 remain

---

### Using `HAVING` with `SUM()`

```sql
-- Example: Orders with total quantity above 100

SELECT OrderID, SUM(Quantity) AS TotalQuantity
FROM OrderDetails
GROUP BY OrderID
HAVING SUM(Quantity) > 100;
```

This returns only large orders.

---

### Using `HAVING` with `AVG()`

```sql
-- Example: Categories with average price above 50

SELECT CategoryID, AVG(Price) AS AveragePrice
FROM Products
GROUP BY CategoryID
HAVING AVG(Price) > 50;
```

Useful for performance and business analysis.

---

### Combining `WHERE` and `HAVING`

You can use **both together**.

* `WHERE` → filters rows first
* `HAVING` → filters grouped results

```sql
-- Example: Countries in Europe with more than 3 customers

SELECT Country, COUNT(*) AS TotalCustomers
FROM Customers
WHERE Country IN ('Germany', 'UK', 'France', 'Spain')
GROUP BY Country
HAVING COUNT(*) > 3;
```

Here:

1. `WHERE` limits countries
2. `GROUP BY` groups them
3. `HAVING` filters groups

---

### Using Aliases in `HAVING`

In PostgreSQL, MySQL, and SQLite, you can usually use column aliases in `HAVING`.

```sql
-- Example: Using alias in HAVING

SELECT Country, COUNT(*) AS TotalCustomers
FROM Customers
GROUP BY Country
HAVING TotalCustomers > 5;
```

> This works in modern versions of PostgreSQL, MySQL, and SQLite.

---

### Common Mistake: Using WHERE Instead of HAVING

❌ Wrong:

```sql
SELECT Country, COUNT(*)
FROM Customers
WHERE COUNT(*) > 5
GROUP BY Country;
```

✅ Correct:

```sql
SELECT Country, COUNT(*)
FROM Customers
GROUP BY Country
HAVING COUNT(*) > 5;
```

---

### When Should You Use HAVING?

Use `HAVING` when:

✅ You are using `GROUP BY`
✅ You need to filter aggregated data
✅ Your condition uses `COUNT`, `SUM`, `AVG`, `MIN`, or `MAX`

Do NOT use `HAVING` when simple `WHERE` is enough.

---

### Common Use Cases

| Question                  | Solution                     |
| ------------------------- | ---------------------------- |
| Countries with > 10 users | `HAVING COUNT(*) > 10`       |
| Orders worth > $500       | `HAVING SUM(Price) > 500`    |
| High-paying departments   | `HAVING AVG(Salary) > 60000` |
| Busy customers            | `HAVING COUNT(OrderID) > 20` |

---

### Key Takeaways

* `WHERE` filters rows
* `HAVING` filters groups
* `HAVING` works with aggregate functions
* Used only with `GROUP BY`
* Runs after grouping

---

### Mental Model

Think like this:

```
Table
↓ WHERE
Filtered Rows
↓ GROUP BY
Groups
↓ HAVING
Filtered Groups
↓ SELECT
Final Result
```

---
