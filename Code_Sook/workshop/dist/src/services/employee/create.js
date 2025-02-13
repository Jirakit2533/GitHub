export function create(employeeRepository) {
    return async (data) => {
        const employee = await employeeRepository.create(data);
        return employee;
    };
}
