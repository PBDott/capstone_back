import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { DeleteTradeDto } from './dto/delete-trade';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  async createTrade(@Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.createTrade(createTradeDto);
  }

  @Get()
  async getAll() {
    try {
      return this.tradeService.getAll();
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
      throw new InternalServerErrorException('Faild to update trade');
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
      throw new InternalServerErrorException('Faild to delete trade');
    }
  }
}
