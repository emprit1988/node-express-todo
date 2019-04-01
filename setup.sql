DROP DATABASE IF EXISTS express_todo;
create database express_todo;

\c express_todo;

create table tasks(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR,
    task_name VARCHAR,
    created_at TIMESTAMP default NOW(),
    updated_at TIMESTAMP default NOW(),
    expiry_date TIMESTAMP,
    status VARCHAR
)


