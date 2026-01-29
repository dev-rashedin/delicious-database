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

All examples are designed to be **portable across PostgreSQL, MySQL, and SQLite**, with differences clearly explained when necessary. By the end of this article, you will be able to write complex, high-performance queries and confidently work with relational data in production systems.


---

## Grouping Data with `GROUP BY`

The `GROUP BY` clause is used to **group rows that share the same values** in one or more columns and turn them into **summary rows**.

It is mainly used together with **aggregate functions** such as:

`COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`

In simple terms:

`GROUP BY` helps you answer questions like:

* How many users are in each country?
* What is the total sales per month?
* What is the average salary per department?

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

Every column in `SELECT` must either:
  - Be inside an aggregate function, or
  - Appear in `GROUP BY`

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

* `WHERE` → works **before grouping**
* `HAVING` → works **after grouping**

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

* ✅ You are using `GROUP BY`
* ✅ You need to filter aggregated data
* ✅ Your condition uses `COUNT`, `SUM`, `AVG`, `MIN`, or `MAX`

> Do NOT use `HAVING` when simple `WHERE` is enough.

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

## Combining Tables with `JOIN`

In relational databases, data is usually stored across multiple tables. To work with related data, SQL provides the `JOIN` clause.

A `JOIN` combines rows from two or more tables based on a related column.

Most commonly, tables are connected using **primary keys and foreign keys**.

Example relationship:

* `Customers.CustomerID` → Primary Key
* `Orders.CustomerID` → Foreign Key

These columns link the two tables.

---

### Basic JOIN Syntax

```sql
-- Syntax

SELECT column1, column2, ...
FROM table1
JOIN table2
ON table1.common_column = table2.common_column;
```

> Always use `ON` to specify how tables are related.

### Different Types of SQL JOINs

Here are the different types of the JOINs in SQL:

* (INNER) JOIN: Returns records that have matching values in both tables
* LEFT (OUTER) JOIN: Returns all records from the left table, and the matched records from the right table
* RIGHT (OUTER) JOIN: Returns all records from the right table, and the matched records from the left table
* FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table

---

### `INNER JOIN`

`INNER JOIN` returns only rows that exist in **both tables**.

If there is no match, the row is excluded.

---

### Example: Customers with Their Orders

```sql
-- Example: Get orders with customer names

SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID = Customers.CustomerID;
```

Only customers who have orders will appear.

---

### Syntax

```sql
SELECT columns
FROM table1
INNER JOIN table2
ON condition;
```

---

### `JOIN` vs `INNER JOIN`

These are equivalent:

```sql
-- Both are the same

SELECT *
FROM Products
JOIN Categories
ON Products.CategoryID = Categories.CategoryID;

SELECT *
FROM Products
INNER JOIN Categories
ON Products.CategoryID = Categories.CategoryID;
```

`JOIN` defaults to `INNER JOIN`.

---

### Joining Multiple Tables

```sql
-- Example: Orders with customers and shippers

SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID = Customers.CustomerID
INNER JOIN Shippers
ON Orders.ShipperID = Shippers.ShipperID;
```

You can join as many tables as needed.

---

### `LEFT JOIN`

`LEFT JOIN` returns:

* All rows from the **left table**
* Matching rows from the right table
* `NULL` if no match exists

> In some databases `LEFT JOIN` is called `LEFT OUTER JOIN`.

---

### Example: All Customers and Their Orders

```sql
-- Example: Include customers without orders

SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders
ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;
```

Customers without orders will still appear.

---

### Syntax

```sql
SELECT columns
FROM table1
LEFT JOIN table2
ON condition;
```

`LEFT OUTER JOIN` is the same as `LEFT JOIN`.

---

### `RIGHT JOIN`

`RIGHT JOIN` returns:

* All rows from the **right table**
* Matching rows from the left table
* `NULL` if no match exists

>  In some databases `RIGHT JOIN` is called `RIGHT OUTER JOIN`.

---

### Example: All Employees and Their Orders

```sql
-- Example: Include employees without orders

SELECT Orders.OrderID, Employees.LastName, Employees.FirstName
FROM Orders
RIGHT JOIN Employees
ON Orders.EmployeeID = Employees.EmployeeID
ORDER BY Orders.OrderID;
```

Employees without orders are included.

---

### Syntax

```sql
SELECT columns
FROM table1
RIGHT JOIN table2
ON condition;
```

---

### Note on PostgreSQL and SQLite

* PostgreSQL: Supports `RIGHT JOIN`
* SQLite: Does NOT support `RIGHT JOIN` directly

In SQLite, rewrite using `LEFT JOIN`:

```sql
-- Convert RIGHT JOIN to LEFT JOIN in SQLite

SELECT Orders.OrderID, Employees.LastName, Employees.FirstName
FROM Employees
LEFT JOIN Orders
ON Orders.EmployeeID = Employees.EmployeeID;
```

---

### `FULL OUTER JOIN`

`FULL JOIN` returns:

* All rows from both tables
* Matches where possible
* `NULL` where no match exists

> `FULL OUTER JOIN `and `FULL JOIN` are the same.

---

### Example: All Customers and All Orders

```sql
-- Example: Include unmatched customers and orders

SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
FULL OUTER JOIN Orders
ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;
```

---

### Syntax

```sql
SELECT columns
FROM table1
FULL OUTER JOIN table2
ON condition;
```

---

### Database Support

| Database   | FULL JOIN |
| ---------- | --------- |
| PostgreSQL | ✅ Yes     |
| MySQL      | ❌ No      |
| SQLite     | ❌ No      |

MySQL and SQLite workaround:

```sql
-- Simulate FULL JOIN using UNION

SELECT *
FROM Customers
LEFT JOIN Orders
ON Customers.CustomerID = Orders.CustomerID

UNION

SELECT *
FROM Customers
RIGHT JOIN Orders
ON Customers.CustomerID = Orders.CustomerID;
```

---

### `SELF JOIN`

A `SELF JOIN` joins a table with itself.

It is useful when rows inside the same table are related.

Example: Customers from the same city.

---

### Syntax

```sql
SELECT columns
FROM table AS A
JOIN table AS B
ON condition;
```

Aliases are required to distinguish the table.

---

### Example: Customers from the Same City

```sql
-- Example: Match customers in the same city

SELECT A.CustomerName AS Customer1,
       B.CustomerName AS Customer2,
       A.City
FROM Customers A
JOIN Customers B
ON A.City = B.City
AND A.CustomerID <> B.CustomerID
ORDER BY A.City;
```

This finds customers living in the same city.

---

### Summary of JOIN Types

| Join Type | Includes Non-Matching Rows | Use Case                  |
| --------- | -------------------------- | ------------------------- |
| INNER     | ❌ No                       | Only matching data        |
| LEFT      | ✅ Left side                | Keep all left records     |
| RIGHT     | ✅ Right side               | Keep all right records    |
| FULL      | ✅ Both sides               | Complete comparison       |
| SELF      | Same table                 | Hierarchies / comparisons |

---

### Practical Guidelines

### Use `INNER JOIN` when:

* You only want matching records

### Use `LEFT JOIN` when:

* You want all main records, even without matches

### Use `RIGHT JOIN` when:

* You want all records from the second table

### Use `FULL JOIN` when:

* You want a full comparison

### Use `SELF JOIN` when:

* A table references itself

---

### Best Practices

### Always Qualify Column Names

```sql
-- Good practice

SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
JOIN Customers
ON Orders.CustomerID = Customers.CustomerID;
```

Avoid ambiguity.

---

### Use Aliases for Readability

```sql
SELECT o.OrderID, c.CustomerName
FROM Orders o
JOIN Customers c
ON o.CustomerID = c.CustomerID;
```

Improves clarity in complex queries.

---

### Key Takeaways

* `JOIN` connects related tables
* `INNER JOIN` → matching only
* `LEFT/RIGHT JOIN` → preserve one side
* `FULL JOIN` → preserve both sides
* `SELF JOIN` → same table
* SQLite lacks `RIGHT` and `FULL` joins

---

## Set Operations & Existence Checks: `UNION`, `UNION ALL`, `EXISTS`, `ANY`, `ALL`

### Combining Result Sets with `UNION` and `UNION ALL`

* **UNION** combines results of two or more `SELECT` statements and **removes duplicates**.
* **UNION ALL** combines results and **keeps duplicates**.
* All `SELECT` statements must have the **same number of columns**, in the **same order**, and with **compatible data types**.

```sql
-- UNION: Get distinct cities from Customers and Suppliers
SELECT City FROM Customers
UNION
SELECT City FROM Suppliers
ORDER BY City;

-- UNION ALL: Get all cities including duplicates
SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers
ORDER BY City;

-- UNION with WHERE: Only German cities
SELECT City, Country FROM Customers
WHERE Country='Germany'
UNION
SELECT City, Country FROM Suppliers
WHERE Country='Germany'
ORDER BY City;
```

---

### Checking Existence with `EXISTS`

* `EXISTS` checks if a **subquery returns any records**.
* Returns **TRUE** if at least one record exists.

```sql
-- List suppliers who have at least one product priced < 20
SELECT SupplierName
FROM Suppliers
WHERE EXISTS (
    SELECT ProductName
    FROM Products
    WHERE Products.SupplierID = Suppliers.SupplierID
    AND Price < 20
);

-- List suppliers with a product priced exactly 22
SELECT SupplierName
FROM Suppliers
WHERE EXISTS (
    SELECT ProductName
    FROM Products
    WHERE Products.SupplierID = Suppliers.SupplierID
    AND Price = 22
);
```

---

### Comparing Values with `ANY` and `ALL`

* **ANY**: TRUE if **any** value in the subquery meets the condition.
* **ALL**: TRUE if **all** values in the subquery meet the condition.
* Commonly used with comparison operators (`=`, `>`, `<`, `>=`, `<=`, `<>`).

```sql
-- ANY: Find products if any order has Quantity = 10
SELECT ProductName
FROM Products
WHERE ProductID = ANY (
    SELECT ProductID
    FROM OrderDetails
    WHERE Quantity = 10
);

-- ALL: Find products only if all orders have Quantity = 10
SELECT ProductName
FROM Products
WHERE ProductID = ALL (
    SELECT ProductID
    FROM OrderDetails
    WHERE Quantity = 10
);
```

> `ANY` is useful when you want to match **at least one value**, while `ALL` ensures **all values satisfy** a condition.

---


## Wrapping Up Advanced SQL Queries

Congratulations! You have now explored **advanced SQL querying techniques** that go beyond basic CRUD operations:

* You learned how to **group and filter data** with `GROUP BY` and `HAVING`.
* You practiced **writing nested queries** with subqueries to perform dynamic data analysis.
* You mastered **combining tables** using different types of `JOIN`s, including `INNER`, `LEFT`, `RIGHT`, `FULL`, and self joins.
* You discovered how to **merge result sets** with `UNION` and `UNION ALL`.
* You learned to **control query logic** with `EXISTS`, `ANY`, and `ALL`.

With these skills, you can write queries that handle real-world datasets efficiently, uncover insights, and support complex application logic.

Next steps could include:

* Exploring **window functions** for running totals and rankings.
* Learning **indexes, query optimization, and performance tuning**.
* Diving into **transactions and data integrity** for production-ready applications.

By combining these advanced techniques with the **foundational SQL knowledge** from earlier articles, you are now fully equipped to tackle almost any data challenge in PostgreSQL, MySQL, or SQLite.


