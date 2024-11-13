import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Board } from "@prisma/client";
import { BoardService } from "./board.service";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { DeleteBoardDto } from "./dto/delete-board.dto";

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post("createBoard")
    async createBoard(@Body() createBoardDto: CreateBoardDto) {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get()
    async getAll(): Promise<Board[]> {
        return this.boardService.getAll();
    }

    /*@Post("updateBoard")
    async updateBoard(@Body() updateBoardDto: UpdateBoardDto): Promise<Board> {
        return await this.boardService.updateBoard(updateBoardDto);
        
    }*/

    @Post("deleteBoard")
    async deleteBoard(@Body() deleteBoardDto: DeleteBoardDto) {
        return await this.boardService.DeleteBoardDto(deleteBoardDto);
    }

}