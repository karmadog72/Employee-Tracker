const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require("mysql2");
const { connect } = require('http2');

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"Bird2019!!",
  database: "db"
});

connection.connect(err => {
    if (err)
throw err;
console.log('connected')
afterConnection();
});

// user question prompt
const questionPrompt = () => {
inquirer
  .prompt([
      {
    type:"list",
    name:"options",
    message: "Make a selection",
    choices:[
        'View departments',
        "View employee roles",
        "View employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Update employee manager",
        "Remove employee",
        "Remove role",
        "Remove department",
        "Quit"
    ]
      }
  ])
  .then((answers) => {
    const {choices} = answers;
    if (choices === "View departments") {
        viewDepartments();
    }
    if (choices === "View employee roles") {
        viewEmployeeRoles();
    }
    if (choices === "View employees") {
        viewEmployees();
    }
    if (choices === "Add department") {
        AddDepartment();
    }
    if (choices === "Add a role") {
        addARole();
    }
    if (choices === "Add an employee") {
        addAnEmployee();
    }
    if (choices === "Update an employee role") {
        updateAnEmployeeRole();
    }
    if (choices === "Update employee manager") {
        updateEmployeeManager();
    }
    if (choices === "Remove employee") {
        removeEmployee();
    }
    if (choices === "Remove role") {
        removeRole();
    }
    if (choices === "Remove department") {
        removeDepartment();
    }
    if (choices === "Quit") {
        connection.end();
    }
  });
  };
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

// simple query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// with placeholder
connection.query(
  "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
  ["Page", 45],
  function (err, results) {
    console.log(results);
  }
);



// console tablet package-cTable
const table = cTable.getTable([
    {
      name: 'foo',
      age: 10
    }, {
      name: 'bar',
      age: 20
    }
  ]);
  
  console.log(table);
  
  // prints
  name  age
  ----  ---
  foo   10
  bar   20