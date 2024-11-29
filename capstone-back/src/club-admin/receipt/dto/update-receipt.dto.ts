import { IsOptional, IsString, IsNumber, IsDateString, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateReceiptDto {
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsDateString()
    receiptDate?: Date;

    @IsNotEmpty()
    @IsInt()
    amount: number;

    @IsNotEmpty()
    @IsInt()
    receiptId: number;
}