/*
Connect to db as fieldinsights and RUN  \c website \i api/src/seeders/users.sql \q
*/

INSERT INTO products
    (id, product_name, price)
VALUES
    (2020202020202, 'item one', 21);

SELECT
    *
FROM
    products;

INSERT INTO products
    (id, product_name, price)
VALUES
    (3030303030303, 'item two', 43);

SELECT
    *
FROM
    products;