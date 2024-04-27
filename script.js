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

function addEmployee() {};

function updateEmployeeRole() {};

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