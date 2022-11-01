USE company_db;

INSERT INTO department(dept_name)
VALUES
('management'),
('department2'),
('human resources');

INSERT INTO role(title, salary, department_id)
VALUES
('manager', 75000, 1),
('clerk', 55000, 2),
('hr manager', 60000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Mr.', 'Boss', 1, NULL),
('First', 'Employee', 2, 1),
('Second', 'Employee', 3, 1);

