const addEmploy = (firstName, lastName, roleId, managerId) => {
    return {
        query: 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        values: [firstName, lastName, roleId, managerId]
    };
};
export default addEmploy;
