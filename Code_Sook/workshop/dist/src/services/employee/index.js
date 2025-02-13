import * as Creates from "./create.js";
import * as Finds from "./finds.js";
import * as Removes from "./removes.js";
import * as Updates from "./updates.js";
export function initEmployeeService(employeeRepository) {
    return {
        create: Creates.create(employeeRepository),
        findMany: Finds.findMany(employeeRepository),
        findOneById: Finds.findOneById(employeeRepository),
        removeById: Removes.removeById(employeeRepository),
        update: Updates.update(employeeRepository),
    };
}
