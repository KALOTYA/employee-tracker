insert into departments (name)
    values ("Engineering"),
           ("Finance"),
           ("Legal"),
           ("Sales");

insert into roles (title, salary, department_id)
    values ("Sales Lead", 100000, 4),
           ("Salesperson", 80000, 4),
           ("Lead Engineering", 150000, 1),
           ("Software Engineering", 120000, 1),
           ("Account Manager", 160000, 2),
           ("Accountant", 125000, 2),
           ("Legal Team Lead", 250000, 3),
           ("Lawyer", 190000, 3);

insert into employees (first_name, last_name, role_id, manager_id)
    values ("John", "Doe", 1, NULL),
           ("Mike", "Chan", 2, 1),
           ("Ashley", "Rodriguez", 3, NULL),
           ("Ajay", "Kaloty", 4, 3),
           ("Kunal", "Singh", 5, NULL),
           ("Malia", "Brown", 6, 5),
           ("Sarah", "Lourd", 7, NULL),
           ("Tom", "Allen", 8, 7),
           ("Sam", "Kash", 1, 3);