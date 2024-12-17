-- Seed departments
INSERT INTO departments (name) 
VALUES 
  ('Engineering'), 
  ('Finance'), 
  ('Legal'), 
  ('Sales');

-- Seed roles
INSERT INTO roles (title, salary, department_id) 
VALUES 
  ('Software Engineer', 75000, 1),
  ('HR Manager', 65000, 2),
  ('Sales Representative', 55000, 4),
  ('Lawyer', 85000, 3),
  ('Accountant', 60000, 2),
  ('Sales Manager', 75000, 4),
  ('Legal Assistant', 45000, 3),
  ('Sales Lead', 65000, 4),
  ('Lead Engineer', 85000, 1);


-- Seed employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES 
  ('Alice', 'Smith', 1, NULL),
  ('Bob', 'Brown', 2, NULL),
  ('Charlie', 'Davis', 3, NULL),
  ('Harry', 'Oyarvide', 1, NULL),
  ('Ivy', 'Smith', 2, 1),
  ('Jasmine', 'Brown', 3, 2),
  ('Katie', 'Davis', 1, 3),
  ('Liam', 'Oyarvide', 2, 1),
  ('Mia', 'Smith', 3, 2),
  ('Noah', 'Brown', 1, 3),
  ('Olivia', 'Davis', 2, 1),
  ('Parker', 'Oyarvide', 3, 2),
  ('Quinn', 'Smith', 1, 3);
