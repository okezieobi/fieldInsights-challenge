/*
psql -U fieldinsights -d postgres -h 127.0.0.1 -W (linux)
RUN \i api/src/migrations/migrate.sql \q
*/

DROP DATABASE IF EXISTS website;
CREATE DATABASE website;

\c website
\i api/src/tables/users.sql
\i api/src/tables/products.sql

