const addRoles = (title: string, salary: number, departmentId: number) => {
    return {
        text: 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
        values: [title, salary, departmentId]
    };
}
export default addRoles;

