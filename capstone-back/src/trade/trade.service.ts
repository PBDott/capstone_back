import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { TradeRepository } from './repositories/trade.repository';
import { Trade, TradeLike } from '@prisma/client';
import { BuyTradeDto } from './dto/buy-trade';
import { CreateTradeCommentDto } from './dto/create-trade-comment.dto';
import { LikeTradeDto } from './dto/like-trade.dto';

@Injectable()
export class TradeService {
  constructor(private readonly tradeRepository: TradeRepository) { }

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

  async buyTrade(tradeId: number, buyTradeDto: BuyTradeDto): Promise<Trade> {
    return this.tradeRepository.buyTrade(tradeId, buyTradeDto);
  }

  async getTradeById(tradeId: number): Promise<Trade> {
    return this.tradeRepository.getTradeById(tradeId);
  }

  async addComment(tradeId: number, createTradeCommentDto: CreateTradeCommentDto) {
    return this.tradeRepository.addComment(tradeId, createTradeCommentDto);
  }

  async getComments(tradeId: number) {
    return this.tradeRepository.getComments(tradeId);
  }

  async addLike(likeTradeDto: LikeTradeDto): Promise<TradeLike> {
    return this.tradeRepository.addLike(likeTradeDto);
  }

  async removeLike(likeTradeDto: LikeTradeDto): Promise<TradeLike> {
    return this.tradeRepository.removeLike(likeTradeDto);
  }

  async getLikeCount(tradeId: number): Promise<number> {
    return this.tradeRepository.getLikeCount(tradeId);
  }
}
