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

## The Only Correct Fix: Parameterized Queries

SQL injection is **not** solved by:

* Escaping strings manually
* Removing keywords
* Regex filtering
* Input validation alone

It is solved by **parameterized queries**.

---

## Parameterized Queries (PostgreSQL, MySQL, SQLite)

### What Actually Happens

* SQL structure is sent first
* User values are sent separately
* Database treats values strictly as data
* SQL logic cannot be altered

---

### PostgreSQL (Node.js / `pg`)

```js
const result = await client.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);
```

* `$1` is a positional parameter
* PostgreSQL enforces type safety
* Injection is impossible

---

### MySQL (Node.js / `mysql2`)

```js
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);
```

* `?` is a placeholder
* Values are bound safely

---

### SQLite (Node.js / `better-sqlite3`)

```js
db.prepare(
  'SELECT * FROM users WHERE id = ?'
).get(userId);
```

* SQLite supports binding natively
* Same protection guarantees

---

## Inserts Are Also Vulnerable (Not Just SELECT)

### Unsafe Insert

```sql
INSERT INTO users (email) VALUES ('${email}');
```

### Safe Insert (Universal)

```sql
INSERT INTO users (email) VALUES (?);
```

Bound using parameters in:

* PostgreSQL
* MySQL
* SQLite

---

## Key Takeaways (Part 1)

* SQL injection is **database-agnostic**
* PostgreSQL, MySQL, and SQLite are equally affected
* String concatenation is the root cause
* Parameterized queries are mandatory
* Authentication logic is a primary target

---
