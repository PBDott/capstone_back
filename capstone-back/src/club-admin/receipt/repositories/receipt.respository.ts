import { Injectable } from "@nestjs/common";
import { CreateReceiptDto } from "../dto/create-receipt.dto";
import { PrismaService } from "src/prisma.service";
import { UpdateReceiptDto } from "../dto/update-receipt.dto";

@Injectable()
export class ReceiptRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createReceipt(data: CreateReceiptDto) {
        return this.prisma.receipt.create({ data });
    }

    async getAllReceipts(clubId: number) {
        return this.prisma.receipt.findMany({ where: { clubId } });
    }

    async updateReceipt(receiptId: number, data: UpdateReceiptDto) {
        return this.prisma.receipt.update({
            where: { receiptId },
            data,
        });
    }

    async deleteReceipt(receiptId: number) {
        return this.prisma.receipt.delete({ where: { receiptId } });
    }
}