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

function addRole() {};

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