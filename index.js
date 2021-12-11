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
        "Add a department?",
        "Add a role?",
        "Add an Employee?",
        "Update an employee role?",
        "Update employee's manager?",
        "Remove employee?",
        "Remove role?",
        "Remove a department?",
        "Quit?"
    ]
      }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
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