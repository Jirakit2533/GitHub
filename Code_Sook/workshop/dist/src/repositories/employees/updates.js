import { EmployeeSchema, Helpers } from "../../schema/index.js";
export function update(prismaClient) {
    return async (id, data) => {
        const result = await prismaClient.employee.update({
            data,
            where: {
                deletedAt: null,
                id,
            },
        });
        return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result);
    };
}
export function updatePartial(prismaClient) {
    return async (id, data) => {
        const result = await prismaClient.employee.update({
            data,
            where: {
                deletedAt: null,
                id,
            },
        });
        return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result);
    };
}
