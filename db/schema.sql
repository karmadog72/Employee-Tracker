DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;
-- DEPARTMENT TABLE
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);
-- EMPLOYEE ROLE TABLE
CREATE TABLE employee_role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  dept_id INTEGER,
  INDEX dep_ind (dept_id),
  CONSTRAINT fk_department FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE SET NULL  
);
-- EMPLOYEE TABLE 
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  employee_role_id INTEGER,
  INDEX employee_role_id(employee_role_id),
  CONSTRAINT fk_employee_role FOREIGN KEY (employee_role_id) REFERENCES employee_role(id) ON DELETE SET NULL,
  manager_id INTEGER,
  INDEX manager_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);