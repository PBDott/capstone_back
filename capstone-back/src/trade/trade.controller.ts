import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { DeleteTradeDto } from './dto/delete-trade';
import { BuyTradeDto } from './dto/buy-trade';
import { CreateTradeCommentDto } from './dto/create-trade-comment.dto';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) { }

  @Post()
  async createTrade(@Body() createTradeDto: CreateTradeDto) {
    return await this.tradeService.createTrade(createTradeDto);
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
}
