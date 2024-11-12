import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTradeDto } from "../dto/create-trade.dto";
import { Trade, TradeLike } from "@prisma/client";
import { UpdateTradeDto } from "../dto/update-trade.dto";
import { BuyTradeDto } from "../dto/buy-trade";
import { CreateTradeCommentDto } from "../dto/create-trade-comment.dto";
import { LikeTradeDto } from "../dto/like-trade.dto";

@Injectable()
export class TradeRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createTrade(tradeData: CreateTradeDto): Promise<Trade> {
        return this.prisma.trade.create({
            data: {
                title: tradeData.title,
                author: tradeData.author,
                price: tradeData.price,
                seller: {
                    connect: { userId: tradeData.sellerId }
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
                sold: true
            }
        });
    }

    async getTradeById(tradeId: number): Promise<Trade> {
        await this.prisma.trade.update({
            where: { tradeId },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        return this.prisma.trade.findUnique({
            where: { tradeId }
        });
    }

    async addComment(tradeId: number, createTradeCommentDto: CreateTradeCommentDto) {
        return await this.prisma.tradeComment.create({
            data: {
                content: createTradeCommentDto.content,
                userId: createTradeCommentDto.userId,
                tradeId,
                parentCommentId: createTradeCommentDto.parentCommentId || null
            }
        });
    }
    
    async getComments(tradeId: number) {
        return await this.prisma.tradeComment.findMany({
            where: { tradeId, parentCommentId: null },
            include: { replies: true }
        });
    }

    async addLike(likeTradeDto: LikeTradeDto): Promise<TradeLike> {
        const tradeLike = await this.prisma.tradeLike.create({
            data: {
                userId: likeTradeDto.userId,
                tradeId: likeTradeDto.tradeId
            }
        });

        await this.prisma.trade.update({
            where: { tradeId: likeTradeDto.tradeId },
            data: { likeCount: { increment: 1 } }
        });

        return tradeLike;
    }

    async removeLike(likeTradeDto: LikeTradeDto): Promise<TradeLike> {
        const tradeLike = await this.prisma.tradeLike.delete({
            where: {
                userId_tradeId: {
                    userId: likeTradeDto.userId,
                    tradeId: likeTradeDto.tradeId
                }
            }
        });

        await this.prisma.trade.update({
            where: { tradeId: likeTradeDto.tradeId },
            data: { likeCount: { decrement: 1 } }
        });

        return tradeLike;
    }

    async getLikeCount(tradeId: number): Promise<number> {
        const trade = await this.prisma.trade.findUnique({
            where: { tradeId },
            select: { likeCount: true }
        });

        return trade.likeCount;
    }

}