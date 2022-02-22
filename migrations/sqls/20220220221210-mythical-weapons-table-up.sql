-- CREATE TABLE mythical_weapons (name VARCHAR(100), type VARCHAR(50), weight INTEGER, id SERIAL PRIMARY KEY);
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(100),
--     password_digest VARCHAR
-- );

CREATE TABLE Products (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR NOT NULL UNIQUE,
price MONEY NOT NULL,
category INTEGER);

CREATE TABLE Users (
id SERIAL PRIMARY KEY NOT NULL,
firstname VARCHAR NOT NULL,
lastname VARCHAR NOT NULL,
password_digest VARCHAR NOT NULL,
UNIQUE (firstname, lastname));

CREATE TABLE Orders (
id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER NOT NULL,
completed BOOLEAN NOT NULL DEFAULT false);

CREATE TABLE Order_Product (
order_id INTEGER NOT NULL,
product_id INTEGER NOT NULL,
quantity INTEGER NOT NULL,
PRIMARY KEY (order_id, product_id));

ALTER TABLE Orders ADD CONSTRAINT Orders_user_id_User_id FOREIGN KEY (user_id) REFERENCES Users(id);
ALTER TABLE Order_Product ADD CONSTRAINT Order_Product_order_id_Orders_id FOREIGN KEY (order_id) REFERENCES Orders(id);
ALTER TABLE Order_Product ADD CONSTRAINT Order_Product_product_id_Product_id FOREIGN KEY (product_id) REFERENCES Products(id);