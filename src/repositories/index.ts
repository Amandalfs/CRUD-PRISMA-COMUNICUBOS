import { prisma } from "../database/prisma";
import { Autor, Livro } from "@prisma/client";

export class Repository {

    async criarAutorAdicionarVariosLivros(autor: Autor, livros: Livro){
        await prisma.autor.create({
            data: {
                ...autor,
                livros: {
                    create: livros
                }
            },
            include: {
                livros: true
            }
        })
    }
    
    async livros(pagina: number, tamanhoPagina: number, order: boolean): Promise<Livro[]>{
        const livros = await prisma.livro.findMany({
            skip: (pagina-1)*tamanhoPagina,
            take: tamanhoPagina,
            orderBy: {
                data_de_lancamento: order ? "asc": "desc"
            },
            include: {
                autor: true,
            }
        })
        return livros;
    }

    async excluirLivro(id: string): Promise<void>{
        await prisma.livro.delete({
            where: {
                id,
            }
        })
    }

    async excluirAutor(id: string): Promise<void>{
        await prisma.autor.delete({
            where:{
               id, 
            },
            include: {
                livros: true
            }
        })
    }

    async adicionarLivro(id: string, livro: Livro): Promise<void>{
        await prisma.livro.create({
            data: {
                ...livro,
                autor_id: id
            },
        })
    }

    async procurarAutores(search: string): Promise<Autor[]> {
        const autores = await prisma.autor.findMany({
            where: {
                nome: search,
            }
        })

        return autores;
    }
}