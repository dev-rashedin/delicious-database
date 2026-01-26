# SQL Basic Queries

In SQL, **queries** are used to insert, modify, delete, and retrieve data from database tables. After learning how to design databases and define data constraints, the next step is working with real data.

This article focuses on the **core data manipulation and querying commands** used in everyday development, using PostgreSQL, MySQL, and SQLite.

You will learn how to:

- Add new records using `INSERT`.
- Modify existing data with `UPDATE`.
- Remove records safely with `DELETE`.
- Retrieve data using `SELECT`.
- Filter results with `WHERE`.
- Remove duplicates using `DISTINCT`.
- Sort data with `ORDER BY`.
- Limit results using `LIMIT` and `OFFSET`.
- Perform basic analysis with `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`.

All examples are designed to be **portable across PostgreSQL, MySQL, and SQLite**, with differences clearly indicated when necessary. By the end of this article, you will be able to perform complete CRUD (Create, Read, Update, Delete) operations and write efficient basic queries for real-world applications.



## Inserting Data with `INSERT INTO`

The `INSERT INTO` statement is used to add new records to a table.

### Inserting Data with Column Names

It is recommended to specify column names when inserting data. This makes queries clearer and safer.

```sql
-- Syntax
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

-- Example: Insert a New Customer
INSERT INTO Customers (
  CustomerName,
  ContactName,
  Address,
  City,
  PostalCode,
  Country
)
VALUES (
  'Cardinal',
  'Tom B. Erichsen',
  'Skagen 21',
  'Stavanger',
  '4006',
  'Norway'
);
```

If a column is defined as auto-increment (such as `CustomerID`), its value is generated automatically.

---

### Inserting Data Without Column Names

When inserting values for **all columns**, you can omit column names. The order of values must match the table structure.

```sql
-- Syntax & Example
-- Insert values for all columns (order must match table definition)
INSERT INTO Customers
VALUES (
  NULL,
  'Cardinal',
  'Tom B. Erichsen',
  'Skagen 21',
  'Stavanger',
  '4006',
  'Norway'
);
```

> Note: Using this format is not recommended for large projects because it depends on column order.


### Inserting Data into Selected Columns

You can insert data into specific columns. Other columns will use `NULL` or their default values.

```sql
-- Syntax & Example
-- Insert data into selected columns only
INSERT INTO Customers (CustomerName, City, Country)
VALUES ('Cardinal', 'Stavanger', 'Norway');
```

Columns that are not included will receive `NULL` or default values.

---

### Inserting Multiple Rows

You can insert multiple records in a single query using multiple value sets.

```sql
-- Syntax & Example
-- Insert multiple customers at once
INSERT INTO Customers (
  CustomerName,
  ContactName,
  Address,
  City,
  PostalCode,
  Country
)
VALUES
  ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway'),
  ('Greasy Burger', 'Per Olsen', 'Gateveien 15', 'Sandnes', '4306', 'Norway'),
  ('Tasty Tee', 'Finn Egan', 'Streetroad 19B', 'Liverpool', 'L1 0AA', 'UK');
```

Each set of values must be separated by a comma.

---


## Updating Data with `UPDATE`

The `UPDATE` statement is used to **modify existing records** in a table. Always use a `WHERE` clause to avoid updating all rows accidentally.

```sql
-- Syntax
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

-- Example: Update a Single Record
-- Change the contact name and city for CustomerID = 1
UPDATE Customers
SET ContactName = 'Alfred Schmidt',
    City = 'Frankfurt'
WHERE CustomerID = 1;
```

### Updating Multiple Records

The `WHERE` clause controls how many records are updated. Without it, all records in the table are modified.

```sql
-- Example: Update multiple rows
-- Set ContactName to 'Juan' for all customers in Mexico
UPDATE Customers
SET ContactName = 'Juan'
WHERE Country = 'Mexico';
```

### Warning: Omitting the WHERE Clause

If you omit the `WHERE` clause, **all rows in the table will be updated**:

```sql
-- Example: Dangerous - updates all rows!
UPDATE Customers
SET ContactName = 'Juan';
```

Always double-check your `WHERE` condition before running an `UPDATE` to prevent accidental mass changes.

---

## Deleting Data with `DELETE`

The `DELETE` statement is used to **remove existing records** from a table. Always use a `WHERE` clause to avoid deleting all rows unintentionally.

```sql
-- Syntax
DELETE FROM table_name
WHERE condition;

-- Example: Delete a single customer
-- Remove "Alfreds Futterkiste" from the Customers table
DELETE FROM Customers
WHERE CustomerName = 'Alfreds Futterkiste';
```

### Deleting All Records

If you omit the `WHERE` clause, **all rows in the table will be deleted**, but the table structure remains intact:

```sql
-- Example: Delete all rows from the Customers table
DELETE FROM Customers;
```

### Deleting the Entire Table

To remove the table completely, including its structure and indexes, use `DROP TABLE`:

```sql
-- Example: Drop the Customers table
DROP TABLE Customers;
```

> **Warning:** Always double-check your `WHERE` condition when using `DELETE`. Omitting it will remove all data in the table.

---


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
