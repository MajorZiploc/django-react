# Purpose

for querying your db without needing to install postgres on your machine

# Setup

go to http://127.0.0.1:8080/

login with these values from your .env

  PGADMIN_DEFAULT_EMAIL

  PGADMIN_DEFAULT_PASSWORD

add your database:

On Left side under Object Explorer

Right click Servers and choose Register -> Server...

In General tab:

```
Name: local
```

In Connection tab: (values from your .env)

```
Host name/address: ${POSTGRES_HOST}
Port: ${POSTGRES_PORT}
Maintenance database: ${POSTGRES_DB}
Usename: POSTGRES_USER='postgres'
Password: ${POSTGRES_PASSWORD}
Save password? true
```

# Viewing Tables and performing queries

On Left side under Object Explorer

Servers -> local -> Databases -> postgres(or your db name) -> Schemas -> Tables

right click on any table and choose Query Tool
