const getEmployee = () => {
    return `
      SELECT 
      employees.id AS employee_id, 
      employees.first_name, 
      employees.last_name, 
      roles.title, 
      roles.salary, 
      departments.name AS department, 
      manager.first_name AS manager
      FROM employees 
      JOIN roles ON employees.role_id = roles.id 
      JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id;
    `;
}
export default getEmployee;