/*
 Warnings:
 
 - You are about to drop the column `createdAt` on the `Boost` table. All the data in the column will be lost.
 - Added the required column `boostType` to the `Boost` table without a default value. This is not possible if the table is not empty.
 - Made the column `boosts` on table `Player` required. This step will fail if there are existing NULL values in that column.
 
 */
-- DropIndex
DROP INDEX "Boost_name_key";

-- AlterTable
ALTER TABLE
    "Boost"
ADD
    COLUMN "boostType" TEXT NOT NULL DEFAULT 'standard';

-- AlterTable
ALTER TABLE
    "Boost"
ALTER COLUMN
    "boostType" DROP DEFAULT;

-- AlterTable
ALTER TABLE
    "Boost" RENAME COLUMN "createdAt" TO "createdAt_old";

ALTER TABLE
    "Boost"
ADD
    COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE
    "Boost"
SET
    "createdAt" = "createdAt_old";

ALTER TABLE
    "Boost" DROP COLUMN "createdAt_old";

-- AlterTable
ALTER TABLE
    "Player"
ALTER COLUMN
    "boosts"
SET
    NOT NULL;

-- CreateTable
CREATE TABLE "ActiveBoost" (
    "id" TEXT NOT NULL,
    "boostId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "endTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userSessionId" TEXT NOT NULL,
    CONSTRAINT "ActiveBoost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE
    "ActiveBoost"
ADD
    CONSTRAINT "ActiveBoost_boostId_fkey" FOREIGN KEY ("boostId") REFERENCES "Boost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "ActiveBoost"
ADD
    CONSTRAINT "ActiveBoost_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "ActiveBoost"
ADD
    CONSTRAINT "ActiveBoost_userSessionId_fkey" FOREIGN KEY ("userSessionId") REFERENCES "UserSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;