export function update(employeeRepository) {
    return async (id, data) => {
        return employeeRepository.update(id, data);
    };
}
