import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Board } from "@prisma/client";
import { BoardService } from "./board.service";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { DeleteBoardDto } from "./dto/delete-board.dto";

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
      return await this.boardService.createBoard(createBoardDto);
    }
  
    @Get()
    async getAllBoards(): Promise<Board[]> {
      try {
        return await this.boardService.getAllBoards();
      } catch (error) {
        throw new InternalServerErrorException('Failed to retrieve all boards');
      }
    }

    @Get(':boardId')
    async getBoardById(@Param('boardId', ParseIntPipe) boardId: number): Promise<Board> {
      try {
        const board = await this.boardService.getBoardById(boardId);
        if (!board) {
          throw new NotFoundException(`Board with ID ${boardId} not found`);
        }
        return board;
      } catch (error) {
        throw new InternalServerErrorException('Failed to retrieve board');
      }
    }

    @Post('update')
    async updateTrade(@Body() updateBoardDto: UpdateBoardDto) {
      const boardId = updateBoardDto.boardId;
      try {
        const board = await this.boardService.updateBoard(boardId, updateBoardDto);
        if (!board) {
          throw new NotFoundException(`board with ID ${boardId} not found `);
        }
        return board;
      } catch (error) {
        throw new InternalServerErrorException('Failed to update board');
      }
    }
  
    @Post('delete')
    async deleteBoard(@Body() deleteBoardDto: DeleteBoardDto) {
      const boardId = deleteBoardDto.boardId;
      try {
        const board = await this.boardService.deleteBoard(boardId);
        if (!board) {
          throw new NotFoundException(`board with ID ${boardId} not found `);
        }
        return board;
      } catch (error) {
        throw new InternalServerErrorException('Failed to delete board');
      }
    }
    
}