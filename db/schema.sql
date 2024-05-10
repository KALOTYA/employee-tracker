
drop database if exists company_db;

create database company_db;

use company_db;

create table departments (
    id int not null auto_increment,
    name varchar(30),
    primary key(id)
);

create table roles (
    id int not null auto_increment,
    title varchar(30),
    salary decimal,
    department_id int,
    primary key(id),
    foreign key (department_id) references departments(id) 
);

create table employees (
    id int not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int not null,
    manager_id int,
    primary key(id),
    foreign key (role_id) references roles(id)  
);
