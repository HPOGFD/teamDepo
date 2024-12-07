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
  ('Lead Engineer', 85000, 1),
  ('CFO', 85000, 2),
  ('CEO', 100000, 1),
  ('CTO', 90000, 1);

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
  ('Quinn', 'Smith', 1, 3),
  ('Riley', 'Brown', 2, 1),
  ('Sophia', 'Davis', 3, 2),
  ('Tyler', 'Oyarvide', 1, 3),
  ('Uma', 'Smith', 2, 1),
  ('Victor', 'Brown', 3, 2),
  ('Willow', 'Davis', 1, 3),
  ('Xavier', 'Oyarvide', 2, 1),
  ('Yara', 'Smith', 3, 2),
  ('Zane', 'Brown', 1, 3),
  ('Ava', 'Davis', 2, 1),
  ('Ben', 'Oyarvide', 3, 2),
  ('Cora', 'Smith', 1, 3),
  ('Dax', 'Brown', 2, 1),
  ('Ella', 'Davis', 3, 2),
  ('Finn', 'Oyarvide', 1, 3),
  ('Gia', 'Smith', 2, 1),
  ('Hank', 'Brown', 3, 2),
  ('Isla', 'Davis', 1, 3),
  ('Jack', 'Oyarvide', 2, 1),
  ('Kara', 'Smith', 3, 2),
  ('Liam', 'Brown', 1, 3),
  ('Mia', 'Davis', 2, 1),
  ('Noah', 'Oyarvide', 3, 2),
  ('Olivia', 'Smith', 1, 3),
  ('Parker', 'Brown', 2, 1),
  ('Quinn', 'Davis', 3, 2),
  ('Riley', 'Oyarvide', 1, 3),
  ('Sophia', 'Smith', 2, 1);
