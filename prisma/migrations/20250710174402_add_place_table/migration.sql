-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TURISTA');

-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('RESTAURANTE', 'BAR', 'HOTEL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'TURISTA';

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typePlace" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "images" JSONB[],

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);
