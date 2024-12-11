SELECT 
  e.first_name,
  e.last_name,
  r.title AS role,
  d.name AS department,
  e.manager_id
FROM employees e
JOIN roles r ON e.role_id = r.id
JOIN departments d ON r.department_id = d.id;
