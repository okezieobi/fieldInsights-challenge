/*
Connect to db as fieldinsights and RUN  \c website \i api/src/seeders/users.sql \q
*/

INSERT INTO products
    (id, "name", price, quantity)
VALUES
    (2020202020202, 'item one', 21, 1000);

SELECT
    *
FROM
    products;

INSERT INTO products
    (id, "name", price, quantity)
VALUES
    (3030303030303, 'item two', 43, 4000);

SELECT
    *
FROM
    products;