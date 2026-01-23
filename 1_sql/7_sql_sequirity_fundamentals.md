# SQL Security Fundamentals

## What SQL Injection Really Is (RDBMS-Agnostic)

SQL injection is a class of vulnerabilities where **untrusted user input is interpreted as executable SQL code** instead of data.

This is not a Python issue, not an ASP.NET issue, and not a PHP issue.

It is a **database interaction flaw** that affects **PostgreSQL, MySQL, and SQLite equally**, because all three:

* Parse SQL strings
* Execute them as commands
* Trust the application layer to send valid, safe SQL

If user input is concatenated into SQL strings, the database cannot distinguish:

* **Data** vs **Instructions**

---

## Where SQL Injection Actually Happens (Real Web Context)

SQL injection occurs when **application code builds SQL dynamically** using raw user input.

Typical real-world sources of user input:

* Login forms
* Search boxes
* URL query parameters
* JSON request bodies
* Headers (less common, but possible)

### Vulnerable Pattern (Universal)

```js
const userId = req.query.userId;
const sql = `SELECT * FROM users WHERE id = ${userId}`;
```

This pattern is dangerous in **PostgreSQL**, **MySQL**, and **SQLite**.

---

## SQL Injection via `OR 1=1` (Always True)

### Intended Query

```sql
SELECT * FROM users WHERE id = 105;
```

### Attacker Input

```
105 OR 1=1
```

### Final Query Executed

```sql
SELECT * FROM users WHERE id = 105 OR 1=1;
```

### Why This Works (All Databases)

* `1=1` is always true
* `OR true` bypasses the condition
* The database returns **all rows**

This behavior is identical in:

* PostgreSQL
* MySQL
* SQLite

### Real-World Impact

If the query is:

```sql
SELECT id, email, password_hash FROM users WHERE id = 105 OR 1=1;
```

The attacker receives:

* Every user record
* All password hashes
* Potential admin accounts

---

## SQL Injection in Authentication (`"" = ""` Pattern)

### Vulnerable Login Logic

```js
const username = req.body.username;
const password = req.body.password;

const sql = `
SELECT * FROM users
WHERE username = "${username}"
AND password = "${password}"
`;
```

### Attacker Input

```
username: " OR ""="
password: " OR ""="
```

### Final Query

```sql
SELECT * FROM users
WHERE username = "" OR ""=""
AND password = "" OR ""="";
```

### Why This Bypasses Login

* `""=""` evaluates to `TRUE`
* Authentication conditions collapse
* First user row is returned
* Login succeeds without valid credentials

This exploit works **unchanged** in:

* PostgreSQL
* MySQL
* SQLite

---

## Batched (Stacked) SQL Injection

### What Batched Statements Are

Some databases allow **multiple SQL statements in one request**, separated by semicolons.

```sql
SELECT * FROM users; DROP TABLE suppliers;
```

### Attacker Input Example

```
105; DROP TABLE suppliers
```

### Final Query

```sql
SELECT * FROM users WHERE id = 105; DROP TABLE suppliers;
```

### Database Support Reality

| Database   | Default Behavior             |
| ---------- | ---------------------------- |
| PostgreSQL | ❌ Disallowed by most drivers |
| MySQL      | ⚠️ Allowed if enabled        |
| SQLite     | ⚠️ Allowed via some APIs     |

**Important:**
Even if your DB blocks stacked queries, **do not rely on this for security**.
Other injection vectors still apply.

---


---
