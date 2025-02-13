export function removeById(employeeRepository) {
    return (id) => {
        return employeeRepository.remove(id);
    };
}
