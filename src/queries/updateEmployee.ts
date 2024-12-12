const updateEmploy = (name: string, roleId: number, employeeId: number) => {
    return {
        query: 'UPDATE employees SET role_id = $1 WHERE id = $2',
        values: [name, roleId, employeeId]
    };
}
export default updateEmploy;

