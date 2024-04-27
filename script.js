const inquirer = require("inquirer");
const mysql2 = require("mysql2");
require(dotenv).config();

const connection = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'DB_USER',
        password: 'DB_PASSWORD',
        database: 'DB_NAME',
    }
);

function viewAllDepartments() {
    connection.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
    });
};

function viewAllRoles() {
    connection.query('SELECT * FROM roles', function (err, results) {
        console.log(results);
    });
};

function viewAllEmployees() {
    connection.query('SELECT * FROM employees', function (err, results) {
        console.log(results);
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the Department:',
            validate: function (input) {
                if (!input) {
                    return 'Department name cannot be empty.';
                }
                return true;
            }
        }
    ])
    .then((answers) => {
        const departmentName = answers.departmentName;
        connection.query(
            'INSERT INTO departments (name) VALUES (?)',
            [departmentName],
            function (err, results) {
                if (err) {
                    console.error('Error adding department:', err);
                } else {
                    console.log(`Department ${departmentName} added successfully!`);
                }
                mainMenu();
            }
        )
    })
};

function addRole() {
    connection.query('SELECT * FROM departments', function (err, departments) {
        if (err) {
            console.error('Error fetching departments:', err);
            return;
        }

        inquirer.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter title of Role:',
                validate: function (input) {
                    if (!input) {
                        return 'Role title cannot be empty';
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the Salary fro the role:',
                validate: function (input) {
                    if (!input || isNaN(input)) {
                        return 'Please Enter a valid Salary';
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department for the role:',
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            }
        ])
        .then((answers) => {
            const { roleTitle, roleSalary, departmentId } = answers;
            connection.query(
                'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
                [roleTitle, roleSalary, departmentId],
                function (err, results) {
                    if (err) {
                        console.error('Error adding role:', err);
                    } else {
                        console.log(`Role ${roleTitle} added successfully!`);
                    }
                    mainMenu();
                }
            )
        })
    })
};

function addEmployee() {
    connection.query('SELECT * FROM roles', function (err, roles) {
        if (err) {
            console.error('Error fetching roles:', err);
            return;
        }

        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter Employee first name:',
                validate: function (input) {
                    return input ? true : 'Employees first name cannot be empty'
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter Employee last name:',
                validate: function (input) {
                    return input ? true : 'Employees last name cannot be empty'
                }
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the Employee role:',
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the managers ID (if applicable):',
                validate: function (input) {
                    return (input === '' || !isNaN(input)) ? true : 'Please enter a valid id'
                }
            }
        ])
        .then((answers) => {
            const { firstName, lastName, roleId, managerId } = answers;
            connection.query(
                'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                [firstName, lastName, roleId, managerId || null],
                function (err, results) {
                    if (err) {
                        console.error('Error adding employee:', err);
                    } else {
                        console.log(`Employee ${firstName} ${lastName} added successfully!`);
                    }
                    mainMenu();
                } 
            );
        });
    });
};

function updateEmployeeRole() {
    connection.query('SELECT * FROM employees', function (err, employees) {
        if (err) {
            console.error('Error fetching employees:', err);
            return;
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to update:',
                choices: employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }))
            }
        ])
        .then((employeeAnswer) => {
            const employeeId = employeeAnswer.employeeId;

            connection.query('SELECT * FROM roles', function (err, roles) {
                if (err) {
                    console.error('Error fetching roles:', err);
                    return;
                }

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Select new role for employee:',
                        choices: roles.map(role => ({
                            name: role.title,
                            value: role.id
                        }))
                    }
                ])
                .then((roleAnswer) => {
                    const roleId = roleAnswer.roleId;

                    connection.query(
                        'UPDATE employees SET role_id = ? WHERE id = ?',
                        [roleId, employeeId],
                        function (err, result) {
                            if (err) {
                                console.error('Error updating employee role:', err);
                            } else {
                                console.log('Employee role updated successfully!');
                            }
                            mainMenu();
                        }
                    );
                });
            });
        });
    });
};

function exit() {};

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update Employee Role', 'Exit']
        },
    ])
    .then((answers) => {
        switch (answers.mainMenu) {
            case 'View All Departments': viewAllDepartments();
                break;
            case 'View All Roles': viewAllRoles();
                break;
            case 'View All Employees': viewAllEmployees();
                break;
            case 'Add A Department': addDepartment();
                break;
            case 'Add A Role': addRole();
                break;
            case 'Add An Employee': addEmployee();
                break;
            case 'Update Employee Role': updateEmployeeRole();
                break;
            case 'Exit': console.log('Goodbye!');
                connection.end();
                break;
            default: console.log('Invalid Choice!');
                mainMenu();
        }
    })
};