-- CreateTable
CREATE TABLE "LearningModule" (
    "id" UUID NOT NULL,
    "chapterNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "durationLabel" TEXT NOT NULL,
    "contentVersion" INTEGER NOT NULL DEFAULT 1,
    "lastReviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleCard" (
    "id" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "ModuleCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningModule_chapterNumber_key" ON "LearningModule"("chapterNumber");

-- CreateIndex
CREATE INDEX "ModuleCard_moduleId_idx" ON "ModuleCard"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleCard_moduleId_order_key" ON "ModuleCard"("moduleId", "order");

-- AddForeignKey
ALTER TABLE "ModuleCard" ADD CONSTRAINT "ModuleCard_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "LearningModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
