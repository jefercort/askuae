-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "nameUser" VARCHAR(255) NOT NULL,
    "emailUser" VARCHAR(255) NOT NULL,
    "role" VARCHAR(25) NOT NULL,
    "profileImg" VARCHAR(255),
    "userFrom" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceProvider" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "phone1" VARCHAR(255),
    "phone2" VARCHAR(255),
    "wp1" BOOLEAN NOT NULL DEFAULT false,
    "wp2" BOOLEAN NOT NULL DEFAULT false,
    "tg1" BOOLEAN NOT NULL DEFAULT false,
    "tg2" BOOLEAN NOT NULL DEFAULT false,
    "instaUrl" VARCHAR(255),
    "tiktokUrl" VARCHAR(255),
    "websiteUrl" VARCHAR(255),
    "address" VARCHAR(255),
    "rating" DECIMAL(2,1),
    "reviewCount" INTEGER,
    "mapsUrl" VARCHAR(255),

    CONSTRAINT "ServiceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOffering" (
    "id" SERIAL NOT NULL,
    "tittle" VARCHAR(255) NOT NULL,
    "categoryId" UUID NOT NULL,
    "providerId" UUID NOT NULL,
    "price" DECIMAL(10,2),
    "description" TEXT NOT NULL,

    CONSTRAINT "ServiceOffering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "iconUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL,
    "autorId" UUID NOT NULL,
    "providerId" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceProvider" ADD CONSTRAINT "ServiceProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOffering" ADD CONSTRAINT "ServiceOffering_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOffering" ADD CONSTRAINT "ServiceOffering_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ServiceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ServiceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
