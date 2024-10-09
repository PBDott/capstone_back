import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { TradeRepository } from './repositores/trade.repository';
import { Trade } from '@prisma/client';

@Injectable()
export class TradeService {
  constructor(private readonly tradeRepository: TradeRepository) {}

  async createTrade(createTradeDto: CreateTradeDto): Promise<Trade> {
    return this.tradeRepository.createTrade(createTradeDto);
  }

  async getAll(): Promise<Trade[]> {
    return this.tradeRepository.getAll();
  }

  async updateTrade(tradeId: number, updateTradeDto: UpdateTradeDto): Promise<Trade> {
    return this.tradeRepository.updateTrade(tradeId, updateTradeDto);
  }

  async deleteTrade(tradeId: number): Promise<Trade> {
    return this.tradeRepository.deleteTrade(tradeId);
  }
}
