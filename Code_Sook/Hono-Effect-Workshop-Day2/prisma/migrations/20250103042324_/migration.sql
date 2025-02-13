-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Developer', 'Manager');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('IT', 'Accounting', 'HR');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "department" "Department" NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Overtime" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hoursWorked" DECIMAL(65,30) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Overtime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Employee_role_department_idx" ON "Employee"("role", "department");

-- CreateIndex
CREATE INDEX "Employee_department_idx" ON "Employee"("department");

-- CreateIndex
CREATE INDEX "Overtime_date_idx" ON "Overtime"("date");
