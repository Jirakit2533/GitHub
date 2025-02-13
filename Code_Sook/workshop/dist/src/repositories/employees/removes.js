import { EmployeeSchema, Helpers } from "../../schema/index.js";
export function remove(prismaClient) {
    return async (id) => {
        const result = await prismaClient.employee.update({
            data: {
                deletedAt: new Date(),
            },
            where: {
                id,
            },
        });
        return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result);
    };
}
export function hardRemoveById(prismaClient) {
    return async (id) => {
        const result = await prismaClient.employee.delete({
            where: {
                id,
            },
        });
        return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result);
    };
}
