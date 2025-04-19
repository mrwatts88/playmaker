/*
  Warnings:

  - You are about to drop the column `active` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `boosts` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `statCategoryXp` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,sessionId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Player_userSessionId_availablePlayerId_key";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "active",
DROP COLUMN "boosts",
DROP COLUMN "name",
DROP COLUMN "position",
DROP COLUMN "statCategoryXp",
DROP COLUMN "team",
DROP COLUMN "xp",
ADD COLUMN     "isCreator" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "startTime" DROP DEFAULT,
ALTER COLUMN "status" SET DEFAULT 'WAITING';

-- AlterTable
ALTER TABLE "UserSession" ADD COLUMN     "isCreator" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_sessionId_key" ON "Player"("userId", "sessionId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
