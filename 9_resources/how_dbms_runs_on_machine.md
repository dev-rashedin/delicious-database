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


## 5. How DBMS Communicates with CPU, RAM, and Disk

### 5.1 RAM (Shared Buffers)

* DBMS keeps frequently accessed data in RAM.
* Reduces slow disk reads.
* Example: `users` table pages may be cached.

### 5.2 Disk (Storage)

* Tables, indexes, and **Write-Ahead Log (WAL)** are stored on SSD/HDD.
* WAL ensures durability: before updating a table, DBMS logs changes first.

### 5.3 CPU

* CPU executes **compiled DBMS code** (C binaries).
* All logical operations (filtering, joining, aggregating) happen in CPU registers.



## 6. Internal Representation (From SQL to Binary)

1. SQL is **high-level** (human-readable)
2. DBMS converts SQL → **execution plan** (tree of operations)
3. Executor calls **C functions** → CPU instructions
4. CPU executes instructions → reads/writes bytes from/to RAM/disk

**Practical tiny example:**

```sql
SELECT 1 + 1;
```

* SQL: `SELECT 1 + 1;` → human-readable
* DBMS executor calls CPU to add numbers
* CPU sees machine code (binary), e.g., `10101000` for ADD instruction
* CPU computes result → returns 2 to DBMS → returned to client

> SQL itself is **never binary**; DBMS converts it into CPU instructions that operate on memory and disk.



## 7. Transactions and Concurrency

* PostgreSQL uses **MVCC (Multi-Version Concurrency Control)**:

  * Each transaction sees a consistent snapshot
  * Readers don’t block writers
  * Writers don’t block readers
* Ensures **ACID properties**:

  * **Atomicity**: all or nothing
  * **Consistency**: DB moves from one valid state to another
  * **Isolation**: concurrent transactions don’t interfere
  * **Durability**: committed data persists on disk



## 8. Visual Diagram (Data Flow)

```
[ Client App (Node.js / psql / DBeaver) ]
                 |
                 v
           [ PostgreSQL Server ]
                 |
  ----------------|----------------
  |               |                |
 [CPU]           [RAM]           [Disk]
 (Executes      (Caches         (Stores tables,
 instructions)  frequently       indexes, WAL)
                accessed pages)
```

**Flow Example:**

1. Client sends SQL query
2. PostgreSQL parses query → execution plan
3. Executor reads/writes RAM + Disk using CPU instructions
4. Result sent back to client



## 9. Key Takeaways

* SQL = human-readable instructions
* DBMS = program that **interprets SQL** and manipulates data on CPU, RAM, Disk
* Node.js/JavaScript = application logic, does not store data persistently
* PostgreSQL is written in **C**, very efficient and portable
* DBMS internally uses **parsing, planning, execution** to convert SQL → CPU instructions → read/write RAM/Disk
* MVCC + WAL ensures safe concurrent and durable operations



---



