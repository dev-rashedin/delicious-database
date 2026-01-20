# Understanding How a DBMS Works on Your Machine

This article explains **how a Database Management System (DBMS) works internally**, starting from history, types, and languages used to implement them, down to exactly what happens when you execute a SQL query. It is written for beginners and non-CSE developers.



## 1. What is a DBMS?

A **Database Management System (DBMS)** is a **software program that stores, manages, and retrieves data**. It allows users and applications to interact with data using high-level languages like **SQL**.

**Key Functions of a DBMS:**

* Storing data in files on disk
* Reading/writing data efficiently
* Ensuring data integrity and consistency
* Managing concurrent access (multiple users)
* Supporting transactions with ACID properties
* Optimizing queries using indexes

**Popular DBMS examples:**

| DBMS       | Language Used | Notes                                |
| ---------- | ------------- | ------------------------------------ |
| PostgreSQL | C             | Open-source, widely used in industry |
| MySQL      | C/C++         | Open-source, popular for web apps    |
| SQLite     | C             | Lightweight, embedded DB             |
| MongoDB    | C++           | NoSQL, document-oriented             |
| Oracle DB  | C/C++/Java    | Enterprise-grade                     |



## 2. Short History of DBMS

* **1960s-1970s:** Early hierarchical and network databases (IBM IMS)
* **1970s:** Relational model proposed by E. F. Codd
* **1980s-1990s:** SQL became standard, major RDBMS like Oracle, MySQL, PostgreSQL emerged
* **2000s:** NoSQL databases appeared for flexible, scalable storage



## 3. How DBMS Runs on Your Machine

A DBMS is a **program** that runs on your CPU, uses RAM for temporary data, and stores permanent data on disk.

### 3.1 Basic components on a machine

| Component | Role                                                  |
| --------- | ----------------------------------------------------- |
| CPU       | Executes the DBMS program instructions (machine code) |
| RAM       | Stores frequently accessed data (buffer cache)        |
| Disk      | Stores tables, indexes, and logs permanently          |
| Network   | Optional: allows remote clients to connect            |

When you install PostgreSQL or MySQL on your laptop, it starts a **server process** that listens for SQL commands on a network port (usually 5432 for PostgreSQL).



## 4. How a SQL Query Executes in a DBMS

Let's take a **practical example**:

```sql
SELECT * FROM users WHERE age > 20;
```

Here’s what happens internally:

### Step 1: Parsing

* The DBMS **reads your SQL** and checks for syntax errors.
* It converts SQL text into an **internal parse tree**.
* Example parse tree (simplified):

```
QUERY
 └─ SELECT
     ├─ TABLE: users
     └─ CONDITION: age > 20
```

### Step 2: Query Planning / Optimization

* The DBMS decides **how to execute the query efficiently**:

  * Use an index or full table scan?
  * Join order (if multiple tables)
  * Sorting or aggregation order
* Result: **execution plan**, a set of steps to retrieve data.

### Step 3: Execution

* The DBMS executor performs the plan:

  1. Check **RAM cache** for relevant pages
  2. If not in RAM → **read from disk**
  3. Apply condition filters (`age > 20`)
  4. Select requested columns
  5. Store result in output buffer

### Step 4: Return Results

* The DBMS sends the rows back to the client (DBeaver, psql, Node.js)



