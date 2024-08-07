-- CreateTable
CREATE TABLE "People" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf_cnpj" VARCHAR(14) NOT NULL,
    "dtnascimento" DATE NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "pessoa_juridica" BOOLEAN NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "tipo_telefone" VARCHAR(20) NOT NULL,
    "peopleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "number" VARCHAR(255) NOT NULL,
    "neighborhood" VARCHAR(255) NOT NULL,
    "cep" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "addressDetail" VARCHAR(255),
    "peopleId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "People_cpf_cnpj_key" ON "People"("cpf_cnpj");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;
