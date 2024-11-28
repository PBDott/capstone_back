import { IsOptional, IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateReceiptDto {
    @IsNotEmpty()
    @IsString()
    type?: string;

    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsNotEmpty()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsDateString()
    receiptDate?: Date;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    receiptId: number;
}