-- Department

INSERT INTO department (dpt_name)
VALUES ("HR"),
       ("Engineering"),
       ("Interns"),

    --    Roles, Salary & dpt ID
INSERT INTO employee_role(title, salary, dept_id)
VALUES ("HR Coordinator",75000,1),
       ("HR Recruiter",65000,1),
       ("Mechanical Engineer", 95000, 2),
       ("Operations Engineer",85000,2),
       ("CPA Intern", 40000, 3),
       ("IT Intern", 50000,3);

    -- Employees & role IDs
       INSERT INTO employee (first_name, last_name, employee_role_id, manager_id)
VALUES ("Peter","Baily", 4, NULL),
       ("Susan","Smith", 5, 1),
       ("Brians","Ruggles", 4, NULL),
       ("Emma","Gillian", 4, 2),
       ("Bobby","Barns", 4, NULL),
       ("Paula","Sanchez", 4, 3);
       