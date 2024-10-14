import { PartialType } from '@nestjs/mapped-types';
import { CreateTradeDto } from './create-trade.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTradeDto extends PartialType(CreateTradeDto) {
    @IsInt()
    @IsNotEmpty()
    tradeId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    publication: string;

    @IsInt()
    @IsNotEmpty()
    price: number;
}
