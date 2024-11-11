import { Injectable } from "@nestjs/common";
import { BoardRepository } from "./repositories/board.repository";
import { Board } from "@prisma/client";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

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
}