const updateEmploy = (roleId: number, employeeId: number) => {
    return {
        text: 'UPDATE employees SET role_id = $1 WHERE id = $2',
        values: [roleId, employeeId]
    };
}
export default updateEmploy;

