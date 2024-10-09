import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteTradeDto {
    @IsInt()
    @IsNotEmpty()
    tradeId: number;
}