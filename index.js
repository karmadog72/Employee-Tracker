const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const { connect } = require("http2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bird2019!!",
  database: "tracker_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected", connection.threadId);
  questionPrompt();
});

// user question prompt
const questionPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Make a selection",
        choices: [
          "View departments",
          "View employee roles",
          "View employees",
          "Add department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Update employee manager",
          "Remove employee",
          "Remove role",
          "Remove department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;
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
        addDepartment();
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
  //   console.log("Displaying departments...\n");
  const sql = `SELECT department.id AS id, dept_name AS department FROM department`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table("departments", res);
    questionPrompt();
  });
};

viewEmployeeRoles = () => {
  //   console.log("Displaying employee roles...\n");
  const sql = `SELECT employee_role.id, employee_role.title, dept_name AS department
    FROM employee_role
    INNER JOIN department ON employee_role.dept_id = department.id`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log("log", rows);
    questionPrompt();
  });
};

viewEmployees = () => {
  console.log("Displaying employees");
  const sql = `SELECT employee.id,employee.first_name,employee.last_name,employee_role.title,employee_role.salary FROM employee LEFT JOIN employee_role ON employee.employee_role_id = employee_role.id`;
  // LEFT JOIN department ON employee_role.department_id = department.id
  // LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    questionPrompt();
  });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department do you want?",
      },
    ])
    .then((answers) => {
      const { department } = answers;
      connection.query(
        `INSERT INTO department (dept_name) values (?)`,
        department,
        (err) => {
          if (err) throw err;
          console.table(department + " Successfully added ");
          questionPrompt();
        }
      );
    });
};

addARole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Add a role?",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter employee salary",
      },
      {
        type: "input",
        name: "ID",
        message: "Enter department ID",
      },
    ])
    .then((answers) => {
      const { title, salary, ID } = answers;
      connection.query(
        `INSERT INTO employee_role (title, salary, dept_id) values (?, ?, ?)`,
        [title, salary, ID],
        (err) => {
          if (err) throw err;
          console.table(title + " Successfully added ");
          questionPrompt();
        }
      );
    });
};

addAnEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "Add a first name",
        validate: (addFirstName) => {
          if (addFirstName) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last",
        message: "Add a last name",
        validate: (addLastName) => {
          if (addLastName) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "number",
        message: "Enter employee id",
      },
      {
        type: "input",
        name: "manager",
        message: "Enter manager number",
      },
    ])
    .then((answers) => {
      const { first, last, number, manager } = answers;
      connection.query(
        `INSERT INTO employee (first_name, last_name, employee_role_id, manager_id) values (?, ?, ?, ?)`,
        [first, last, number, manager],
        (err) => {
          if (err) throw err;
          console.table(first + " Successfully added ");
          questionPrompt();
        }
      );
    });
};
