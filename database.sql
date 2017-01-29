CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
title varchar (100),
description varchar (200),
location varchar (100),
creation_date DATE,
completion_status varchar (100)
);
INSERT INTO tasks(title, description, location, creation_date, completion_status)
VALUES('laundry', 'Two loads of clothes', 'home', '2017-01-27', False);
