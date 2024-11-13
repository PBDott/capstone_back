import { Injectable } from "@nestjs/common";
import { BoardRepository } from "./board.repository/board.repository";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Board } from "@prisma/client";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { DeleteBoardDto } from "./dto/delete-board.dto";

@Injectable()
export class BoardService {
    constructor(private readonly boardRepository: BoardRepository) {}

    async createBoard(createBoardDto: CreateBoardDto) {
        return this.boardRepository.createBoard(createBoardDto);
    }
    async getAll(): Promise<Board[]> {
        return this.boardRepository.getAll();
    }
    async updateBoard(updateBoardDto: UpdateBoardDto) {
        return this.boardRepository.updateBoard(updateBoardDto);
    }
    async DeleteBoardDto(deleteBoardDto: DeleteBoardDto) {
        return this.boardRepository.deleteBoard(deleteBoardDto);
    }
    
}