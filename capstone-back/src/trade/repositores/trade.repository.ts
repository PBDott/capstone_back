import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTradeDto } from "../dto/create-trade.dto";
import { Trade } from "@prisma/client";
import { UpdateTradeDto } from "../dto/update-trade.dto";
import { BuyTradeDto } from "../dto/buy-trade";

@Injectable()
export class TradeRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createTrade(tradeData: CreateTradeDto): Promise<Trade> {
        return this.prisma.trade.create({
            data: {
                title: tradeData.title,
                author: tradeData.author,
                price: tradeData.price,
                seller: {
                    connect: { userId: tradeData.sellerId}
                }
            },
        });
    }

    async getAll(): Promise<Trade[]> {
        return this.prisma.trade.findMany();
    }

    async updateTrade(tradeId: number, updateTradeDto: UpdateTradeDto) {
        return this.prisma.trade.update({
            where: { tradeId },
            data: updateTradeDto
        });
    }

    async deleteTrade(tradeId: number): Promise<Trade> {
        return this.prisma.trade.delete({
            where: { tradeId }
        });
    }

    async buyTrade(tradeId: number, buyTradeDto: BuyTradeDto) {
        return this.prisma.trade.update({
            where: { tradeId },
            data: {
                buyer: {
                    connect: { userId: buyTradeDto.buyerId }
                },
                sold: buyTradeDto.sold
            }
        });
    }

}