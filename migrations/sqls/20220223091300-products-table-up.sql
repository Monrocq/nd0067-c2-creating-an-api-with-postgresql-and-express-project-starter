CREATE TABLE Products (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR NOT NULL UNIQUE,
price MONEY NOT NULL,
category INTEGER);
