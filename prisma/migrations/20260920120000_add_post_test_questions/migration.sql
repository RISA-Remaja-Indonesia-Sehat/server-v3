-- CreateEnum
CREATE TYPE "PostTestQuestionType" AS ENUM ('SINGLE_CHOICE', 'TRUE_FALSE');

-- AlterTable
ALTER TABLE "PostTestProgress"
ADD COLUMN "correctAnswers" INTEGER,
ADD COLUMN "totalQuestions" INTEGER,
ADD COLUMN "contentVersion" INTEGER;

-- CreateTable
CREATE TABLE "PostTestQuestion" (
    "id" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "chapterNumber" INTEGER NOT NULL,
    "type" "PostTestQuestionType" NOT NULL DEFAULT 'SINGLE_CHOICE',
    "prompt" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correctOptionId" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "contentVersion" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostTestQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostTestQuestion_contentVersion_order_key"
ON "PostTestQuestion"("contentVersion", "order");

-- CreateIndex
CREATE INDEX "PostTestQuestion_contentVersion_isActive_idx"
ON "PostTestQuestion"("contentVersion", "isActive");

-- CreateIndex
CREATE INDEX "PostTestQuestion_chapterNumber_idx"
ON "PostTestQuestion"("chapterNumber");
