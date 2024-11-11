import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Board } from "@prisma/client";
import { BoardService } from "./board.service";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { DeleteBoardDto } from "./dto/delete-board.dto";
import { CreateBoardCommentDto } from "./dto/create-board-comment.dto";
import { LikeBoardDto } from "./dto/like-board.dto";

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

    @Post(':boardId/comment')
    async addComment(@Param('boardId', ParseIntPipe) boardId: number, @Body() createBoardCommentDto: CreateBoardCommentDto) {
        try {
            return this.boardService.addComment(boardId, createBoardCommentDto);
        } catch (error) {
            throw new InternalServerErrorException('Failed to add comment');
        }
    }

    @Get(':boardId/comments')
    async getComments(@Param('boardId', ParseIntPipe) boardId: number) {
        try {
            return await this.boardService.getComments(boardId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to get comments');
        }
    }

    @Post(':boardId/like')
    async likeBoard(@Param('boardId', ParseIntPipe) boardId: number, @Body() likeBoardDto: LikeBoardDto) {
        if (boardId !== likeBoardDto.boardId) {
            throw new BadRequestException('Path boardId and body boardId must match');
        }  

        try {
            return await this.boardService.addLike(likeBoardDto);
        } catch (error) {
            throw new InternalServerErrorException('Failed to like board')
        }
    }
    
    @Post(':boardId/unlike')
    async removeLike(@Param('boardId', ParseIntPipe) boardId: number, @Body() likeTradeDto: LikeBoardDto) {
      if (boardId !== likeTradeDto.boardId) {
        throw new BadRequestException('Path boardId and body boardId must match');
      }
      try {
        return await this.boardService.removeLike(likeTradeDto);
      } catch (error) {
        throw new InternalServerErrorException('Failed to unlike board');
      }
    }
  
    @Get(':boardId/like-count')
    async getLikeCount(@Param('boardId', ParseIntPipe) boardId: number): Promise<{ likeCount: number }> {
      try {
        const likeCount = await this.boardService.getLikeCount(boardId);
        return { likeCount };
      } catch (error) {
        throw new InternalServerErrorException('Failed to get like-count');
      }
    }
}