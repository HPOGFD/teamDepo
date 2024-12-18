// Define a function to generate the SQL query for retrieving employee data
// This function returns a SQL query that gathers detailed information about employees, their roles, departments, and managers
const getEmployee = () => {
  return `
    SELECT 
    employees.id AS employee_id,        -- Retrieve the employee's ID and alias it as employee_id
    employees.first_name,               -- Retrieve the employee's first name
    employees.last_name,                -- Retrieve the employee's last name
    roles.title,                        -- Retrieve the title of the role assigned to the employee
    roles.salary,                       -- Retrieve the salary of the role
    departments.name AS department,     -- Retrieve the name of the department and alias it as department
    manager.first_name AS manager       -- Retrieve the first name of the manager and alias it as manager
    FROM employees                      -- Source of employee data
    JOIN roles ON employees.role_id = roles.id                -- Join the roles table to match the employee's role
    JOIN departments ON roles.department_id = departments.id  -- Join the departments table to associate the role with a department
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id;  -- Perform a LEFT JOIN to link employees to their managers
  `;
}

// Export the getEmployee function as the default export
export default getEmployee;
