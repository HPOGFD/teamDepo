const addDept = (name: string) => {
    return `INSERT INTO departments (name) VALUES ('${name}') RETURNING *`;
}
export default addDept;

