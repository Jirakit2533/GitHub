import { EmployeeSchema, Helpers } from "../../schema/index.js";
export function create(prismaClient) {
    return async (data) => {
        const result = await prismaClient.employee.create({
            data,
        });
        return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result);
    };
}
