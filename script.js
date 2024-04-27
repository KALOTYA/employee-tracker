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

function addDepartment() {};

function addRole() {};

function addEmployee() {};

function updateEmployeeRole() {};

function exit() {};