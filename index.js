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
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

// Dept. function
viewDepartments = () => {
    console.log("Displaying departments...\n");
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.query(sql, (err,rows) => {
        if (err) throw err;
        console.table(rows);
        questionPrompt();
    });
};

viewEmployeeRoles = () => {
    console.log("Displaying employee roles...\n");
    const sql = `SELECT employee_role.id, employee_role.title, department.name AS department
    FROM employee_role
    INNER JOIN department ON employee_role.department_id = department.id`
    connection.query(sql, (err,rows) => {
        if (err) throw err;
        console.table(rows);
        questionPrompt();
    });
};

viewEmployees = () => {
    console.log("Displaying employees...\n");
    const sql = `SELECT employee.id, 
    employee.first_name, 
    employee.last_name,
    employee_role.title,
    department.name AS department,
    employee_role.salary,
    FROM employee LEFT JOIN role ON employee.employee_role_id = employee_role.id
    LEFT JOIN department ON employee_role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    connection.query(sql, (err,rows) => {
        if (err) throw err;
        console.table(rows);
        questionPrompt();
    });
};


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