## All the examples here are from w3schools

### The CREATE DATABASE statement is used to create a new SQL database.

```sql
-- Syntax
CREATE DATABASE databasename;

-- Example
CREATE DATABASE testDB
```


### The DROP DATABASE statement is used to drop an existing SQL database.

```sql
-- Syntax
DROP DATABASE databasename;

-- Example
DROP DATABASE testDB
```


### The BACKUP DATABASE statement is used in SQL Server to create a full back up of an existing SQL database. 

```sql
-- Syntax
BACKUP DATABASE databasename
TO DISK = 'filepath';

-- Example
BACKUP DATABASE testDB 
TO DISK = 'D:\backups\testDB.bak';
```

### The following SQL statement creates a differential back up of the database "testDB": 

```sql
-- Example
BACKUP DATABASE testDB
TO DISK = 'D:\backups\testDB.bak'
WITH DIFFERENTIAL;
```

>  A differential back up reduces the back up time (since only the changes are backed up

### The CREATE TABLE statement is used to create a new table in a database.

```sql
-- Syntax
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);

-- Example
CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);
```


### The DROP TABLE statement is used to drop an existing table in a database.

```sql
-- Syntax
DROP TABLE table_name;

-- Example
DROP TABLE Shippers;
```

### The TRUNCATE TABLE statement is used to delete the data inside a table, but not the table itself.

```sql
-- Syntax
TRUNCATE TABLE table_name;

-- Example
TRUNCATE TABLE Shippers;
```