import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type bookProps = {
    title: string
    isbn: string
    intro: string
    content: string
    published: boolean
    author: string
    quantity: number
}

export default async ( req: NextApiRequest, res: NextApiResponse) => {
    try {
        const book: bookProps = JSON.parse(req.body)
        if(req.method === 'POST'){
            const data = await prisma.book.create({
                data: {
                    title: book.title,
                    isbn: book.isbn,
                    intro: book.intro,
                    content: book.content,
                    published: true,
                    author: book.author,
                    quantity: book.quantity,
                    borrow: 0
                }
            })
        }
    } catch (err){
        return res.status(500).json({message: "Error creating a new book"})
    }
}