CREATE TABLE urls (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 user_id bigint NOT NULL,
 original_url varchar(100) NOT NULL,
 shortened_url varchar(100) NOT NULL,
 created_at timestamp NOT NULL  DEFAULT CURRENT_TIMESTAMP,
 deleted_at timestamp NULL DEFAULT NULL
);

CREATE TABLE users (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 username varchar(100) NOT NULL,
 salt varchar(100) NOT NULL,
 passhash varchar(100) NOT NULL
);
