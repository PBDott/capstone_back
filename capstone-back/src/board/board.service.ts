import { Injectable } from "@nestjs/common";
import { BoardRepository } from "./repositories/board.repository";
import { Board, BoardLike } from "@prisma/client";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { CreateBoardCommentDto } from "./dto/create-board-comment.dto";
import { LikeBoardDto } from "./dto/like-board.dto";

@Injectable()
export class BoardService {
    constructor(private readonly boardRepository: BoardRepository) {}
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
      return this.boardRepository.createBoard(createBoardDto);
    }
  
    async getAllBoards(): Promise<Board[]> {
      return this.boardRepository.getAllBoards();
    }
  
    async getBoardById(boardId: number): Promise<Board> {
      return this.boardRepository.getBoardById(boardId);
    }
  
    async updateBoard(boardId: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
      return this.boardRepository.updateBoard(boardId, updateBoardDto);
    }
  
    async deleteBoard(boardId: number): Promise<Board> {
      return this.boardRepository.deleteBoard(boardId);
    }

    async addComment(boardId: number, createBoardCommentDto: CreateBoardCommentDto) {
        return this.boardRepository.addComment(boardId, createBoardCommentDto);
    }

    async getComments(boardId: number) {
        return this.boardRepository.getComments(boardId);
    }

    async addLike(likeBoardDto: LikeBoardDto): Promise<BoardLike> {
        return this.boardRepository.addLike(likeBoardDto);
    }

    async removeLike(likeBoardDto: LikeBoardDto): Promise<BoardLike> {
        return this.boardRepository.removeLike(likeBoardDto);
    }

    async getLikeCount(boardId: number): Promise<number> {
        return this.boardRepository.getLikeCount(boardId);
    }
}