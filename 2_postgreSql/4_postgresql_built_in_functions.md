# PostgreSQL Built-in Functions – A Practical Guide for Beginners

PostgreSQL provides hundreds of built-in functions that help you clean data, format values, handle NULLs, work with dates, analyze numbers, and much more.

In this guide, you will learn the **most important PostgreSQL built-in functions**, starting from the most commonly used ones and moving toward less frequently used utilities.

Each function is explained using:

* A real-world problem
* A practical example
* A solution using the function
* A short note with best practices

---

## 1. Text (String) Functions

### 1.1 `LOWER()` – Convert Text to Lowercase

**Problem:**
Usernames and emails are stored with mixed capitalization, making comparisons unreliable.

```sql
SELECT LOWER(email)
FROM users;
```

**Solution:**
`LOWER()` converts all characters to lowercase for consistent comparison.

**Note:**

* Commonly used for case-insensitive searching
* Combine with `WHERE` for filtering
* Often used with indexes in production systems

---

### 1.2 `UPPER()` – Convert Text to Uppercase

**Problem:**
You want to display country codes in uppercase.

```sql
SELECT UPPER(country_code)
FROM customers;
```

**Solution:**
`UPPER()` standardizes text formatting.

**Note:**

* Useful for reports and exports
* Avoid storing transformed values permanently

---

### 1.3 `LENGTH()` – Count Characters

**Problem:**
You want to validate password length.

```sql
SELECT username
FROM users
WHERE LENGTH(password) < 8;
```

**Solution:**
`LENGTH()` counts characters in a string.

**Note:**

* Works with UTF-8 characters
* Different from `CHAR_LENGTH()` in some databases

---

### 1.4 `TRIM()`, `LTRIM()`, `RTRIM()` – Remove Spaces

**Problem:**
Imported data contains unwanted spaces.

```sql
SELECT TRIM(name)
FROM customers;
```

**Solution:**
Removes leading and trailing whitespace.

**Note:**

* Use before inserting cleaned data
* Improves matching accuracy

---

### 1.5 `SUBSTRING()` – Extract Part of Text

**Problem:**
You need the domain from an email.

```sql
SELECT SUBSTRING(email FROM POSITION('@' IN email) + 1)
FROM users;
```

**Solution:**
`SUBSTRING()` extracts partial strings.

**Note:**

* Can be complex for advanced parsing
* Combine with `POSITION()`

---

## 2. NULL Handling Functions

### 2.1 `COALESCE()` – Replace NULL Values

**Problem:**
Some users have no phone numbers.

```sql
SELECT name, COALESCE(phone, 'Not Provided')
FROM users;
```

**Solution:**
Returns the first non-NULL value.

**Note:**

* Extremely important in real projects
* Prevents calculation errors
* Can accept multiple arguments

---

### 2.2 `NULLIF()` – Convert Values to NULL

**Problem:**
Empty strings should be treated as NULL.

```sql
SELECT NULLIF(comment, '')
FROM feedback;
```

**Solution:**
Returns NULL if values match.

**Note:**

* Often used with `COALESCE()`
* Helps normalize data

---

## 3. Date and Time Functions

### 3.1 `NOW()` / `CURRENT_TIMESTAMP`

**Problem:**
You want to record when an order is created.

```sql
INSERT INTO orders(created_at)
VALUES (NOW());
```

**Solution:**
Returns current date and time.

**Note:**

* Timezone aware
* Prefer over manual timestamps

---

### 3.2 `CURRENT_DATE`

**Problem:**
Filter today’s records.

```sql
SELECT *
FROM orders
WHERE order_date = CURRENT_DATE;
```

**Note:**

* Returns date only
* No time component

---

### 3.3 `TO_DATE()` – Convert Text to Date

**Problem:**
Dates are stored as strings.

```sql
SELECT TO_DATE('2026-01-29', 'YYYY-MM-DD');
```

**Solution:**
Converts formatted text into date values.

**Note:**

* Format must match exactly
* Incorrect format causes errors

---

### 3.4 `AGE()` – Calculate Time Difference

**Problem:**
Find user age.

```sql
SELECT AGE(birth_date)
FROM users;
```

**Note:**

* Returns interval type
* More precise than subtraction

---

### 3.5 `EXTRACT()` – Get Parts of Date

**Problem:**
Group orders by year.

```sql
SELECT EXTRACT(YEAR FROM order_date)
FROM orders;
```

**Note:**

* Works with month, day, hour, etc.
* Useful for reporting

---

## 4. Numeric Functions

### 4.1 `ROUND()` – Round Numbers

**Problem:**
Prices show too many decimals.

```sql
SELECT ROUND(price, 2)
FROM products;
```

**Note:**

* Second parameter = decimals
* Common in finance systems

---

### 4.2 `CEILING()` / `FLOOR()`

**Problem:**
Round up shipping weights.

```sql
SELECT CEILING(weight)
FROM packages;
```

**Note:**

* CEILING = up
* FLOOR = down

---

### 4.3 `ABS()` – Absolute Value

**Problem:**
Remove negative balances.

```sql
SELECT ABS(balance)
FROM accounts;
```

---

### 4.4 `RANDOM()` – Generate Random Numbers

**Problem:**
Select random users for testing.

```sql
SELECT *
FROM users
ORDER BY RANDOM()
LIMIT 1;
```

**Note:**

* Not suitable for large tables
* Can be slow

---

## 5. Aggregate Functions (With Functions)

### 5.1 `COUNT()`

```sql
SELECT COUNT(*) FROM users;
```

### 5.2 `SUM()`

```sql
SELECT SUM(amount) FROM payments;
```

### 5.3 `AVG()`

```sql
SELECT AVG(score) FROM exams;
```

### 5.4 `MIN()` / `MAX()`

```sql
SELECT MIN(price), MAX(price)
FROM products;
```

**Note:**

* Combine with `GROUP BY`
* Ignore NULL values

---

## 6. Conditional Functions

### 6.1 `CASE` – Conditional Logic

**Problem:**
Label users based on activity.

```sql
SELECT name,
CASE
  WHEN login_count > 100 THEN 'Active'
  WHEN login_count > 20 THEN 'Normal'
  ELSE 'Inactive'
END AS status
FROM users;
```

**Note:**

* Similar to if-else
* Very powerful in reports

---

## 7. JSON Functions (Modern PostgreSQL)

### 7.1 `->` and `->>` – Read JSON Fields

**Problem:**
User settings stored in JSON.

```sql
SELECT settings->>'theme'
FROM users;
```

**Note:**

* `->` returns JSON
* `->>` returns text

---

### 7.2 `JSONB_EXTRACT_PATH_TEXT()`

```sql
SELECT jsonb_extract_path_text(data, 'profile', 'name')
FROM users;
```

---

## 8. Type Conversion Functions

### 8.1 `CAST()`

**Problem:**
Convert text to integer.

```sql
SELECT CAST(age AS INTEGER)
FROM users;
```

---

### 8.2 `::` Operator

```sql
SELECT age::INTEGER
FROM users;
```

**Note:**

* PostgreSQL shortcut
* More readable for many developers

---

## 9. Less Common but Useful Functions

### 9.1 `GREATEST()` / `LEAST()`

```sql
SELECT GREATEST(score1, score2);
```

---

### 9.2 `MD5()` – Hashing

```sql
SELECT MD5(password);
```

**Note:**

* Not recommended for secure passwords
* Use bcrypt in applications

---

### 9.3 `GENERATE_SERIES()` – Create Sequences

```sql
SELECT generate_series(1,10);
```

**Note:**

* Excellent for testing
* Useful in analytics

---

## 10. Best Practices When Using Functions

* Avoid using functions in `WHERE` on indexed columns
* Prefer storing raw data, not transformed data
* Document complex expressions
* Test functions on large datasets
* Combine functions carefully

---

## Conclusion

PostgreSQL built-in functions allow you to:

* Clean and normalize data
* Handle missing values safely
* Format dates and numbers
* Analyze information efficiently
* Build advanced queries

Mastering these functions will significantly improve your productivity and query quality.

As you continue learning, practice combining multiple functions together and applying them in real projects.

In the next step, you can explore performance optimization and indexing strategies to make your queries even faster.
