import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReceiptDto {
    @IsNotEmpty()
    @IsString()
    type: string; 

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    receiptDate: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    clubId: number;
}
