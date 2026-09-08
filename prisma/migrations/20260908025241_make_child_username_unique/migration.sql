/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `ChildProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChildProfile_username_key" ON "ChildProfile"("username");
