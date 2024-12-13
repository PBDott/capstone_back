import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, NotFoundException, ParseIntPipe, BadRequestException, Req, UseGuards } from '@nestjs/common';
import { TradeService } from './trade.service';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { DeleteTradeDto } from './dto/delete-trade';
import { BuyTradeDto } from './dto/buy-trade';
import { CreateTradeCommentDto } from './dto/create-trade-comment.dto';
import { LikeTradeDto } from './dto/like-trade.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'src/common/user.interface';
import { CreateTradeRequestDto } from './dto/create-trade-request.dto';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTrade(
    @Body() createTradeRequestDto: CreateTradeRequestDto,
    @Req() req: Request
  ) {
    try {
      const { userId, nickname } = req.payload;
      return this.tradeService.createTrade({
        ...createTradeRequestDto,
        sellerId: userId,
        nickname,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create trade');
    }
  }

  @Get()
  async getAll() {
    try {
      return await this.tradeService.getAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get all trade');
    }
  }

  @Post('update')
  async updateTrade(@Body() updateTradeDto: UpdateTradeDto) {
    const tradeId = updateTradeDto.tradeId;
    try {
      const trade = await this.tradeService.updateTrade(tradeId, updateTradeDto);
      if (!trade) {
        throw new NotFoundException(`Trade with ID ${tradeId} not found `);
      }
      return trade;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update trade');
    }
  }

  @Post('delete')
  async deleteTrade(@Body() deleteTradeDto: DeleteTradeDto) {
    const tradeId = deleteTradeDto.tradeId;
    try {
      const trade = await this.tradeService.deleteTrade(tradeId);
      if (!trade) {
        throw new NotFoundException(`Trade with ID ${tradeId} not found `);
      }
      return trade;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete trade');
    }
  }

  @Post('buyTrade')
  async buyTrade(@Body() buyTradeDto: BuyTradeDto) {
    const tradeId = buyTradeDto.tradeId;
    try {
      const trade = await this.tradeService.buyTrade(tradeId, buyTradeDto);
      if (!trade) {
        throw new NotFoundException(`Trade with ID ${tradeId} not found `);
      }
      return trade;
    } catch (error) {
      throw new InternalServerErrorException('Failed to buy trade');
    }
  }

  @Get(":tradeId")
  async getTradeById(@Param('tradeId', ParseIntPipe) tradeId: number) {
    try {
      const trade = await this.tradeService.getTradeById(tradeId);
      if (!trade) {
        throw new NotFoundException(`Trade with Id ${tradeId} not found`);
      }
      return trade;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to get views');
    }
  }

  @Post(':tradeId/comment')
  async addComment(@Param('tradeId', ParseIntPipe) tradeId: number, @Body() createTradeCommentDto: CreateTradeCommentDto) {
    try {
      return await this.tradeService.addComment(tradeId, createTradeCommentDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to add comment');
    }
  }

  @Get(':tradeId/comment')
  async getComments(@Param('tradeId', ParseIntPipe) tradeId: number) {
    try {
      return await this.tradeService.getComments(tradeId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get comments');
    }
  }

  @Post(':tradeId/like')
  async likeTrade(@Param('tradeId', ParseIntPipe) tradeId: number, @Body() likeTradeDto: LikeTradeDto) {
    if (tradeId !== likeTradeDto.tradeId) {
      throw new BadRequestException('Path tradeId and body tradeId mush match');
    }

    try {
      return await this.tradeService.addLike(likeTradeDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to like Trade')
    }
  }

  @Post(':tradeId/unlike')
  async removeLike(@Param('tradeId', ParseIntPipe) tradeId: number, @Body() likeTradeDto: LikeTradeDto) {
    if (tradeId !== likeTradeDto.tradeId) {
      throw new BadRequestException('Path tradeId and body tradeId must match');
    }
    try {
      return await this.tradeService.removeLike(likeTradeDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to unlike trade');
    }
  }

  @Get(':tradeId/like-count')
  async getLikeCount(@Param('tradeId', ParseIntPipe) tradeId: number): Promise<{ likeCount: number }> {
    try {
      const likeCount = await this.tradeService.getLikeCount(tradeId);
      return { likeCount };
    } catch (error) {
      throw new InternalServerErrorException('Failed to get like-count');
    }
  }
}
