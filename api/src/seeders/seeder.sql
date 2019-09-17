/*
psql -U fieldinsights -d postgres -h 127.0.0.1 -W (linux)
RUN \i api/src/seeders/seeder.sql \q
*/

\c website
\i api/src/seeders/users.sql
\i api/src/seeders/products.sql