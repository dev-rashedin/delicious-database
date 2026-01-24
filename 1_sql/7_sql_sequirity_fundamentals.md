# SQL Security Fundamentals 

## Introduction: Why SQL Security Matters

Modern applications rely on databases to store their most sensitive assets: user credentials, financial records, personal data, internal business logic, and audit trails. While application code evolves rapidly, SQL remains the foundational language used to access and manipulate this data.

SQL security fundamentals exist because **a database will faithfully execute any valid SQL it receives**. It does not know whether a query was constructed safely or recklessly. That responsibility belongs entirely to the application layer.

A single mistake in how SQL queries are constructed can result in:

* Unauthorized data exposure
* Authentication bypass
* Data corruption or deletion
* Full system compromise

SQL injection and related vulnerabilities have existed for decades, yet they remain among the **most exploited security flaws in real-world systems**. Understanding SQL security is therefore not optional for developers—it is a baseline competency.

This article builds a **conceptual and practical foundation** for SQL security, independent of programming language, framework, or database vendor.

---

## What This Article Covers

This article focuses on **how SQL behaves**, **how attackers exploit unsafe usage**, and **how developers must defend against it** at the query level.

It avoids framework-specific abstractions and instead explains:

* What actually goes wrong
* Why it goes wrong
* How to prevent it correctly

---

## Table of Contents

1. Introduction to SQL Security
2. How SQL Injection Works (Real-World Examples)
3. Preventing SQL Injection (Practical Solutions)
4. Database Permissions & Least Privilege
5. Takeaways & Security Checklist

---

# 1. SQL Injection

## What SQL Injection Is

SQL injection is a class of vulnerabilities where **untrusted input is interpreted as executable SQL**, rather than as plain data.

This happens when:

* User input is directly concatenated into SQL strings
* The database receives a syntactically valid query
* The database executes that query exactly as written

The database engine does not evaluate intent. If the SQL is valid, it will run.

---

## Where SQL Injection Occurs

SQL injection occurs at the **boundary between application input and query construction**.

Typical sources of untrusted input include:

* Login forms
* Search fields
* URL parameters
* JSON request bodies
* API payloads

### Vulnerable Pattern

```sql
SELECT * FROM users WHERE id = <user_input>;
```

If `<user_input>` is inserted directly into the query string, the query structure itself becomes controllable by the attacker.

---

## Logical SQL Injection: `OR 1=1`

### Intended Query

```sql
SELECT * FROM users WHERE id = 105;
```

### Malicious Input

```
105 OR 1=1
```

### Executed Query

```sql
SELECT * FROM users WHERE id = 105 OR 1=1;
```

### Why This Works

* `1=1` always evaluates to true
* `OR true` nullifies the filtering condition
* The query returns **every row**

This is not a bug in SQL. It is valid SQL behaving exactly as instructed.

---

## Authentication Bypass via Logical Injection

### Vulnerable Login Query

```sql
SELECT * FROM users
WHERE username = "<input_username>"
AND password = "<input_password>";
```

### Attacker Input

```
" OR ""="
```

### Executed Query

```sql
SELECT * FROM users
WHERE username = "" OR ""=""
AND password = "" OR ""="";
```

### Result

* All conditions evaluate to true
* Authentication logic collapses
* Login succeeds without valid credentials

This attack does not require special permissions or advanced tooling—only knowledge of SQL logic.

---

## Batched (Stacked) SQL Injection

Some environments allow multiple SQL statements to be executed in a single request, separated by semicolons.

### Example Payload

```
105; DROP TABLE suppliers
```

### Executed Query

```sql
SELECT * FROM users WHERE id = 105;
DROP TABLE suppliers;
```

### Impact

* First statement executes normally
* Second statement performs destructive action
* Data loss occurs immediately

Whether batched execution is allowed depends on configuration, but **relying on configuration for security is a mistake**. Unsafe query construction remains vulnerable.

---

## Why String Concatenation Is the Root Cause

The core problem is **mixing code and data**.

When SQL is built like this:

```sql
"... WHERE id = " + userInput
```

The database cannot distinguish:

* What was intended as logic
* What was intended as data

From the database’s perspective, it is all just SQL.

---

## Parameterized Queries: The Fundamental Defense

Parameterized queries separate:

* **SQL structure** (fixed, trusted)
* **Values** (dynamic, untrusted)

### Safe Query Pattern

```sql
SELECT * FROM users WHERE id = ?;
```

The value is supplied separately at execution time. The database treats it strictly as data, never as executable logic.

This single principle eliminates:

* Logical injection
* Authentication bypass
* Stacked query attacks

---

