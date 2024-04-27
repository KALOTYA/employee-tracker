insert into departments ( id , name)
    values (1, "Engineering"),
           (2, "Finance"),
           (3, "Legal"),
           (4, "Sales");

insert into roles (id, title, salary, department_id)
    values (1, "Sales Lead", 100000, 4),
           (2, "Salesperson", 80000, 4),
           (3, "Lead Engineering", 150000, 1),
           (4, "Software Engineering", 120000, 1),
           (5, "Account Manager", 160000, 2),
           (6, "Accountant", 125000, 2),
           (7, "Legal Team Lead", 250000, 3),
           (8, "Lawyer", 190000, 3);

insert into employees (id, first_name, last_name, role_id, manager_id)
    values (1, "John", "Doe", 1, NULL),
           (2, "Mike", "Chan", 2, 1),
           (3, "Ashley", "Rodriguez", 3, NULL),
           (4, "Ajay", "Kaloty", 4, 3),
           (5, "Kunal", "Singh", 5, NULL),
           (6, "Malia", "Brown", 6, 5),
           (7, "Sarah", "Lourd", 7, NULL),
           (8, "Tom", "Allen", 8, 7),
           (9, "Sam", "Kash", 1, 3),