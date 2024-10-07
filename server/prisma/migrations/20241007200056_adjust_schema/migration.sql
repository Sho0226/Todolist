/*
  Warnings:

  - Added the required column `todoUserId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "todoUserId" INTEGER NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "TodoUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "TodoUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TodoUser_name_key" ON "TodoUser"("name");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoUserId_fkey" FOREIGN KEY ("todoUserId") REFERENCES "TodoUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
