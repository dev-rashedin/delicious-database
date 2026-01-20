### The CREATE DATABASE statement is used to create a new SQL database.

```sql
-- Syntax:
CREATE DATABASE databasename;

-- Example
CREATE DATABASE testDB
```


### The DROP DATABASE statement is used to drop an existing SQL database.

```sql
-- Syntax:
DROP DATABASE databasename;

-- Example
DROP DATABASE testDB
```


### The BACKUP DATABASE statement is used in SQL Server to create a full back up of an existing SQL database. 

```sql
-- Syntax:
BACKUP DATABASE databasename
TO DISK = 'filepath';

-- Example:
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