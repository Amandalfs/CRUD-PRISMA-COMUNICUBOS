-- CreateTable
CREATE TABLE "autores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "livros" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "paginas" INTEGER NOT NULL,
    "data_de_lancamento" DATETIME NOT NULL,
    "autor_id" TEXT NOT NULL,
    CONSTRAINT "livros_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "autores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "autores_email_key" ON "autores"("email");
