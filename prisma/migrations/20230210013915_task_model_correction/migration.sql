-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "content" DROP NOT NULL;
