/*
  Warnings:

  - Changed the type of `typePlace` on the `Place` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "typePlace",
ADD COLUMN     "typePlace" "PlaceType" NOT NULL;
