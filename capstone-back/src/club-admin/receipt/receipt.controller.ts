import { Body, Controller, Get, InternalServerErrorException, NotFoundException, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ReceiptService } from "./receipt.service";
import { CreateReceiptDto } from "./dto/create-receipt.dto";
import { UpdateReceiptDto } from "./dto/update-receipt.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { ClubRoles } from "../clubRoles.decorator";

@Controller('club-admin/receipt')
export class ReceiptController {
    constructor(private readonly receiptService: ReceiptService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async createReceipt(@Body() createReceiptDto: CreateReceiptDto) {
        try {
            return await this.receiptService.createReceipt(createReceiptDto);
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to create receipt');
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async getAllReceipts(@Query('clubId', ParseIntPipe) clubId: number) {
        try {
            return await this.receiptService.getAllReceipts(clubId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch receipts');
        }
    }

    @Post('update')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async updateReceipt(@Body() updateReceiptDto: UpdateReceiptDto) {
        const receiptId = updateReceiptDto.receiptId;
        try {
            const receipt = await this.receiptService.updateReceipt(receiptId, updateReceiptDto);
            if(!receiptId) {
                throw new NotFoundException(`Receipt with ID ${receiptId} not found`);
            }
            return receipt;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update receipt');
        }
    }

    @Post('delete')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async deleteReceipt(@Body('receiptId', ParseIntPipe) receiptId: number) {
        try {
            const receipt = await this.receiptService.deleteReceipt(receiptId);
            if (!receipt) {
                throw new NotFoundException(`Receipt with ID ${receiptId} not found`);
            }
            return receipt;
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete receipt');
        }
    }
}