export function findMany(employeeRepository) {
    return async () => {
        return employeeRepository.findManyWithRelations();
    };
}
export function findOneById(employeeRepository) {
    return async (id) => {
        return employeeRepository.findByIdWithRelations(id);
    };
}
