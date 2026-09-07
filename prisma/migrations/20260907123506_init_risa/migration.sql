-- CreateEnum
CREATE TYPE "AccessStatus" AS ENUM ('ACTIVE', 'REVOKED');

-- CreateTable
CREATE TABLE "Guardian" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildProfile" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL DEFAULT 'avatar-01',
    "pinHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChildProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuardianChild" (
    "guardianId" UUID NOT NULL,
    "childId" UUID NOT NULL,
    "status" "AccessStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuardianChild_pkey" PRIMARY KEY ("guardianId","childId")
);

-- CreateTable
CREATE TABLE "ParentalConsent" (
    "id" UUID NOT NULL,
    "guardianId" UUID NOT NULL,
    "childId" UUID NOT NULL,
    "policyVersion" TEXT NOT NULL,
    "consentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "ParentalConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterProgress" (
    "id" SERIAL NOT NULL,
    "childId" UUID NOT NULL,
    "chapterNumber" INTEGER NOT NULL,
    "score" INTEGER,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChapterProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTestProgress" (
    "id" UUID NOT NULL,
    "childId" UUID NOT NULL,
    "score" INTEGER,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostTestProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ParentalConsent_guardianId_idx" ON "ParentalConsent"("guardianId");

-- CreateIndex
CREATE INDEX "ParentalConsent_childId_idx" ON "ParentalConsent"("childId");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterProgress_childId_chapterNumber_key" ON "ChapterProgress"("childId", "chapterNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PostTestProgress_childId_key" ON "PostTestProgress"("childId");

-- AddForeignKey
ALTER TABLE "GuardianChild" ADD CONSTRAINT "GuardianChild_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "Guardian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuardianChild" ADD CONSTRAINT "GuardianChild_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentalConsent" ADD CONSTRAINT "ParentalConsent_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "Guardian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentalConsent" ADD CONSTRAINT "ParentalConsent_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterProgress" ADD CONSTRAINT "ChapterProgress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTestProgress" ADD CONSTRAINT "PostTestProgress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
