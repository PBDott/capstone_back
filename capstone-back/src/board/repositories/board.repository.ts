import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "../dto/create-board.dto";
import { Board } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UpdateBoardDto } from "../dto/update-board.dto";

@Injectable()
export class BoardRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createBoard(data: CreateBoardDto): Promise<Board> {
        return this.prisma.board.create({
          data: {
            title: data.title,
            content: data.content,
            authorId: data.authorId,
          },
        });
    }

    async getAllBoards(): Promise<Board[]> {
        return this.prisma.board.findMany();
      }
    
      async getBoardById(boardId: number): Promise<Board | null> {
        return this.prisma.board.findUnique({
          where: { boardId },
          include: { author: true }
        });
    }

    async updateBoard(boardId: number, data: UpdateBoardDto): Promise<Board> {
        return this.prisma.board.update({
          where: { boardId },
          data,
        });
      }
    
    async deleteBoard(boardId: number): Promise<Board> {
        return this.prisma.board.delete({
          where: { boardId },
        });
    }

}