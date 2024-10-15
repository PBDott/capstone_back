import { IsBoolean, IsInt, IsNotEmpty } from "class-validator";

export class BuyTradeDto {
    @IsInt()
    @IsNotEmpty()
    tradeId: number;

    @IsInt()
    @IsNotEmpty()
    buyerId: number;
}
