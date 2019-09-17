/*
Connect to database as fieldinsights and RUN  \c website \i api/src/tables/users.sql
*/

CREATE EXTENSION
IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id          bigint       PRIMARY KEY NOT NULL,
    full_name   varchar(128) NOT NULL,
    email       varchar(128) NOT NULL UNIQUE,
    username    varchar(128) NOT NULL UNIQUE,
    "password"  varchar(128) NOT NULL,
    "type"      varchar(128) DEFAULT 'Client',
    is_admin    boolean      DEFAULT  false,
    create_date timestamptz  DEFAULT NOW(),
    modify_date timestamptz  DEFAULT NOW()
);
