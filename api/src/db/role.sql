/*
RUN psql -U postgres -a -f "src/db/role.sql" to create role (windows)
sudo -u postgres psql -f api/src/db/role.sql (linux)
sudo /etc/init.d/postgresql start (WSL) then RUN above
*/
DROP ROLE IF EXISTS fieldinsights;
CREATE ROLE fieldinsights
WITH LOGIN PASSWORD 'lovely' CREATEDB SUPERUSER;
