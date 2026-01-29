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







