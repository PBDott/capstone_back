import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "../dto/create-board.dto";
import { Board, BoardComment, BoardLike } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UpdateBoardDto } from "../dto/update-board.dto";
import { LikeBoardDto } from "../dto/like-board.dto";
import { CreateBoardCommentDto } from "../dto/create-board-comment.dto";

@Injectable()
export class BoardRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createBoard(data: CreateBoardDto): Promise<Board> {
        return this.prisma.board.create({
          data: {
            title: data.title,
            content: data.content,
            authorId: data.authorId,
            authorNickname: data.nickName
          },
        });
    }

    async getAllBoards(): Promise<Board[]> {
        return this.prisma.board.findMany();
      }
    
      async getBoardById(boardId: number): Promise<Board> {
        await this.prisma.board.update({
          where: { boardId },
          data: { views: { increment: 1 }}
        });

        return this.prisma.board.findUnique({
            where: { boardId }
        })
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

    async addComment(boardId: number, createBoardCommentDto: CreateBoardCommentDto): Promise<BoardComment> {
        return this.prisma.boardComment.create({
            data: {
                content: createBoardCommentDto.content,
                userId: createBoardCommentDto.userId,
                boardId,
                parentCommentId: createBoardCommentDto.parentCommentId || null
            },
        });
    }

    async getComments(boardId: number): Promise<BoardComment[]> {
        return this.prisma.boardComment.findMany({
            where: { boardId, parentCommentId: null },
            include: { replies: true }
        });
    }

    async addLike(likeBoardDto: LikeBoardDto): Promise<BoardLike> {
        const boardLike = await this.prisma.boardLike.create({
            data: {
                userId: likeBoardDto.userId,
                boardId: likeBoardDto.boardId
            }
        });
        await this.prisma.board.update({
            where: { boardId: likeBoardDto.boardId },
            data: { likeCount: { increment: 1 } }
        });
        return boardLike;
    }

    async removeLike(likeBoardDto: LikeBoardDto): Promise<BoardLike> {
        const boardLike = await this.prisma.boardLike.delete({
            where: {
                userId_boardId: {
                    userId: likeBoardDto.userId,
                    boardId: likeBoardDto.boardId
                }
            }
        });
        await this.prisma.board.update({
            where: { boardId: likeBoardDto.boardId },
            data: { likeCount: { decrement: 1 } }
        });
        return boardLike;
    }

    async getLikeCount(boardId: number): Promise<number> {
        const board = await this.prisma.board.findUnique({
            where: { boardId },
            select: { likeCount: true }
        });
        return board.likeCount;
    }
}