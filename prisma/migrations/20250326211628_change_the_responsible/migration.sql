-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_responsibleId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "responsibleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
