# SQL Basic Queries

In SQL, **queries** are used to interact with databases: retrieving, filtering, and organizing data. This article covers the fundamental query types every developer should know, focusing on PostgreSQL, MySQL, and SQLite.

You will learn how to:

- Retrieve data from a table using `SELECT`.
- Filter results with `WHERE`.
- Remove duplicates using `DISTINCT`.
- Sort results with `ORDER BY`.
- Limit the number of returned rows using `LIMIT`.
- Perform simple aggregations with `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`.

All examples are designed to be **portable across PostgreSQL, MySQL, and SQLite**, with any differences clearly indicated. By the end of this article, you’ll be able to write basic SQL queries to explore and extract meaningful data from your databases efficiently.




## Creating Data with `INSERT INTO`

## Update Data with `UPDATE`

## Delete Data With `DELETE`

## Retrieving Data with `SELECT`

The `SELECT` statement is the foundation of SQL queries. It is used to **retrieve data from one or more tables** in a database.

### Selecting Specific Columns

To select specific columns from a table, use the following syntax:

```sql
-- syntax
SELECT column1, column2, ...
FROM table_name;

-- Example: Return the `CustomerName` and `City` from the `Customers` table:
SELECT CustomerName, City
FROM Customers;
```


> `column1, column2, ...` are the column names you want to retrieve.
> `table_name` is the table from which the data is selected.

### Selecting All Columns

To return **all columns** without listing them individually, use the `*` wildcard:

```sql
SELECT *
FROM Customers;
```

This will retrieve every column in the `Customers` table.

---

### Removing Duplicates with `SELECT DISTINCT`

Sometimes, you only want **unique values** from a column. This is where `DISTINCT` comes in.


```sql
-- Syntax
SELECT DISTINCT column1, column2, ...
FROM table_name;

-- Example: Unique Countries

-- Return all distinct countries from the `Customers` table:
SELECT DISTINCT Country
FROM Customers;
```


### Counting Distinct Values

You can combine `DISTINCT` with aggregation functions like `COUNT` to find the number of unique values:

```sql
SELECT COUNT(DISTINCT Country) AS UniqueCountries
FROM Customers;
```

> Note: `COUNT(DISTINCT column_name)` works in PostgreSQL, MySQL, and SQLite. Only some older SQL variants, like Microsoft Access, require workarounds.

### Selecting Without `DISTINCT`

If you omit `DISTINCT`, duplicate values will be included:

```sql
SELECT Country
FROM Customers;
```

This will return all rows, including repeated country names.


## Filtering Data with `WHERE`

The `WHERE` clause is used to **filter records** and retrieve only rows that meet a specified condition.

```sql
-- Syntax
SELECT column1, column2, ...
FROM table_name
WHERE condition;

-- Example: Filter by Text
-- Select all customers from Mexico:
SELECT *
FROM Customers
WHERE Country = 'Mexico';

-- Example: Filter by Number
-- Select the customer with CustomerID 1:
SELECT *
FROM Customers
WHERE CustomerID = 1;

-- Example: Using Comparison Operators
-- Select all customers with CustomerID greater than 80:
SELECT *
FROM Customers
WHERE CustomerID > 80;
```

**Common Operators for `WHERE`:**
`=` , `>` , `<` , `>=` , `<=` , `<>` (or `!=`), `BETWEEN`, `LIKE`, `IN`

---

## Sorting Data with `ORDER BY`

The `ORDER BY` clause sorts query results in **ascending (`ASC`)** or **descending (`DESC`)** order. By default, it sorts ascending.

```sql
-- Syntax
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;

-- Example: Sort by Price Ascending
SELECT *
FROM Products
ORDER BY Price;

-- Example: Sort by Price Descending
SELECT *
FROM Products
ORDER BY Price DESC;

-- Example: Sort Alphabetically (By Default)
SELECT *
FROM Products
ORDER BY ProductName;

-- Example: Sort Reverse Alphabetically
SELECT *
FROM Products
ORDER BY ProductName DESC;

-- Example: Sort by Multiple Columns
-- Orders by Country, then by CustomerName within the same Country:
SELECT *
FROM Customers
ORDER BY Country, CustomerName;

-- Example: Mixed Ascending and Descending
-- Country ascending, CustomerName descending:
SELECT *
FROM Customers
ORDER BY Country ASC, CustomerName DESC;
```


## Logical Operators, NULL Handling, and Limiting Results

### Logical Operators: `AND`, `OR`, `NOT`

> The AND operator displays a record if all the conditions are TRUE.The OR operator displays a record if any of the conditions are TRUE.

```sql
-- Syntax Examples

-- AND: Select customers from Mexico in Mexico City
SELECT *
FROM Customers
WHERE Country = 'Mexico' AND City = 'México D.F.';

-- OR: Select customers from Mexico or Germany
SELECT *
FROM Customers
WHERE Country = 'Mexico' OR Country = 'Germany';

-- Combining AND and OR : Select all Spanish customers that starts with either "G" or "R":
SELECT * FROM Customers
WHERE Country = 'Spain' AND (CustomerName LIKE 'G%' OR CustomerName LIKE 'R%');

-- NOT: Select customers NOT from Mexico 
-- (NOT gives opposite result)
SELECT *
FROM Customers
WHERE NOT Country = 'Mexico';

-- Select customers that does not start with the letter 'A':
SELECT * FROM Customers
WHERE CustomerName NOT LIKE 'A%';

-- Select customers with a customerID not between 10 and 60:
SELECT * FROM Customers
WHERE CustomerID NOT BETWEEN 10 AND 60;

-- Select customers with a CustomerId not greater than 50:
SELECT * FROM Customers
WHERE NOT CustomerID > 50;
```

### Handling NULL Values


```sql
-- Syntax Examples

-- IS NULL: Select customers with no postal code
SELECT *
FROM Customers
WHERE PostalCode IS NULL;

-- IS NOT NULL: Select customers with a postal code
SELECT *
FROM Customers
WHERE PostalCode IS NOT NULL;
```

> A NULL value is different from a zero value or a field that contains spaces. A field with a NULL value is one that has been left blank during record creation!

### Limiting Results: `LIMIT` and `OFFSET`

```sql
-- Syntax Examples

-- LIMIT: Return only the first 5 customers
SELECT *
FROM Customers
LIMIT 5;

-- OFFSET: Skip the first 5 customers and return the next 5
SELECT *
FROM Customers
LIMIT 5 OFFSET 5;

-- Note: Works the same in PostgreSQL, MySQL, and SQLite
```
