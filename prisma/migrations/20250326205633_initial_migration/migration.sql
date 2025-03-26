-- AlterTable
ALTER TABLE "_TagToTask" ADD CONSTRAINT "_TagToTask_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TagToTask_AB_unique";
