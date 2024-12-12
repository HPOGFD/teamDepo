const getRole = () => {
    return `
      SELECT 
      departments.name AS department, 
      roles.title, 
      roles.salary 
      FROM departments 
      JOIN roles ON departments.id = roles.department_id
    `;
};
export default getRole;
