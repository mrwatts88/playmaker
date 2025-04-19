/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Boost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userSessionId,availablePlayerId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availablePlayerId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "availablePlayerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "status" SET DEFAULT 'waiting';

-- AlterTable
ALTER TABLE "UserSession" ADD COLUMN     "money" INTEGER NOT NULL DEFAULT 1000;

-- CreateTable
CREATE TABLE "AvailablePlayer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stats" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailablePlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Boost_name_key" ON "Boost"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Player_userSessionId_availablePlayerId_key" ON "Player"("userSessionId", "availablePlayerId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_availablePlayerId_fkey" FOREIGN KEY ("availablePlayerId") REFERENCES "AvailablePlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
