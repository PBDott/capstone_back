import { Injectable } from "@nestjs/common";
import { CreateReceiptDto } from "./dto/create-receipt.dto";
import { ReceiptRepository } from "./repositories/receipt.respository";
import { UpdateReceiptDto } from "./dto/update-receipt.dto";

@Injectable()
export class ReceiptService {
    constructor(private readonly receiptRepository: ReceiptRepository) { }

    async createReceipt(createReceiptDto: CreateReceiptDto) {
        return this.receiptRepository.createReceipt(createReceiptDto);
    }

    async getAllReceipts(clubId: number) {
        return this.receiptRepository.getAllReceipts(clubId);
    }

    async updateReceipt(receiptId: number, updateReceiptDto: UpdateReceiptDto) {
        return this.receiptRepository.updateReceipt(receiptId, updateReceiptDto);
    }

    async deleteReceipt(receiptId: number) {
        return this.receiptRepository.deleteReceipt(receiptId);
    }
}