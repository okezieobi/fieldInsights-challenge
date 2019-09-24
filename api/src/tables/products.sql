/*
Connect to database as fieldinsights and RUN  \c website \i api/src/tables/products.sql
*/
DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    id           bigint       PRIMARY KEY NOT NULL,
    "name"       varchar(128) NOT NULL UNIQUE,
    price        numeric      NOT NULL,
    quantity     integer NOT NULL,
    create_date  timestamptz  DEFAULT NOW(),
    modify_date  timestamptz  DEFAULT NOW()
);