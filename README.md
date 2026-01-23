# Delicious Database 🍽️

> A practical, historical, and modern guide to databases — from the very first data stores to today’s cloud-native and serverless systems.

---

## Table of Contents

1. [Introduction](#introduction)
2. [A Brief History of Databases](#a-brief-history-of-databases)
3. [What Is a Database?](#what-is-a-database)
4. [Types of Databases](#types-of-databases)
   - [SQL Databases](#sql-databases)
   - [NoSQL Databases](#nosql-databases)
5. [SQL Databases in Detail](#sql-databases-in-detail)
6. [ORMs and Query Builders](#orms-and-query-builders)
7. [Modern Cloud & Serverless Databases](#modern-cloud--serverless-databases)
8. [NoSQL Databases in Detail](#nosql-databases-in-detail)
9. [Choosing the Right Database](#choosing-the-right-database)
10. [Closing Notes](#closing-notes)

---

## 1. Introduction

Databases are the backbone of every modern application. From small mobile apps to global-scale systems used by millions, databases store, organize, and retrieve data efficiently.

This repository, **Delicious Database**, is my personal learning journal — a structured but honest exploration of databases:
- From theory to practice
- From raw SQL to modern ORMs
- From relational to NoSQL
- From local databases to serverless cloud platforms

This is not a polished textbook.  
It is a **living document** — evolving as I learn.

---

## 2. A Brief History of Databases

### Early Days (1960s–1970s)
- Data stored in **flat files**
- Highly inefficient and error-prone
- Tight coupling between data and application logic

### Hierarchical & Network Databases
- IBM’s **IMS** (1966)
- Data organized as trees or graphs
- Rigid structure, hard to scale

### Relational Databases (1970s)
- Proposed by **Edgar F. Codd**
- Introduced tables, rows, columns
- Data queried using **SQL**
- Still dominant today

### Object-Oriented & NoSQL Era (2000s)
- Web-scale apps demanded flexibility
- Rise of document, key-value, and graph databases

### Cloud & Serverless Databases (2010s–present)
- Managed infrastructure
- Auto-scaling
- Pay-per-use
- Developer-first experience

---

## 3. What Is a Database?

A **database** is an organized collection of data that allows:
- Efficient storage
- Fast retrieval
- Safe modification
- Concurrent access

Databases solve problems like:
- Data consistency
- Data integrity
- Performance at scale

---

## 4. Types of Databases

### SQL (Relational Databases)
- Structured schema
- Tables with relationships
- ACID compliance
- Strong consistency

### NoSQL Databases
- Flexible or schema-less
- Horizontal scaling
- Optimized for specific use cases

---

## 5. SQL Databases

### Common Characteristics
- Use Structured Query Language (SQL)
- Enforce schemas
- Excellent for transactional systems

### Major SQL Databases

#### SQLite
- Embedded database
- Zero configuration
- Ideal for mobile and small apps

#### PostgreSQL
- Advanced open-source RDBMS
- Strong consistency
- Rich feature set (JSON, extensions)

#### MySQL
- Widely used
- Popular with web apps
- Simpler than PostgreSQL

#### Oracle Database
- Enterprise-grade
- Expensive but powerful
- Used in large corporations

---

## 6. ORMs and Query Builders

### Why ORMs Exist
- Reduce boilerplate SQL
- Improve developer productivity
- Type safety and abstractions

### Popular ORMs

#### Prisma
- Schema-first
- Type-safe
- Excellent DX for TypeScript

#### Drizzle
- SQL-first ORM
- Lightweight and predictable
- Closer to raw SQL

#### TypeORM
- Decorator-based
- Class-centric approach
- Used heavily in NestJS ecosystem

---

## 7. Modern Cloud & Serverless Databases

### Neon
- Serverless PostgreSQL
- Branching and autoscaling
- Ideal for modern web apps

### Supabase
- PostgreSQL-based
- Auth, storage, realtime
- Firebase alternative

### PlanetScale
- MySQL-compatible
- Vitess-powered
- Strong scaling capabilities

---

## 8. NoSQL Databases

### MongoDB
- Document-based
- JSON-like storage
- Schema flexibility

### MariaDB
- MySQL fork
- Open-source focused
- High performance

### Mongoose
- ODM for MongoDB
- Schema validation
- Middleware support

---

## 9. Choosing the Right Database

| Use Case | Recommended |
|--------|------------|
| Financial systems | PostgreSQL |
| Mobile apps | SQLite |
| Rapid prototyping | MongoDB |
| Type-safe backend | Prisma + PostgreSQL |
| Serverless apps | Neon / Supabase |

There is no **best database** — only the **right database** for the problem.

---

## 10. Closing Notes

Databases are not just tools — they are **design decisions**.

Learning databases deeply:
- Makes you a better backend engineer
- Improves system design thinking
- Prevents costly architectural mistakes

This repository will continue to grow as my understanding deepens.

Happy querying 🍽️
