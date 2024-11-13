import { IsInt, IsNotEmpty } from 'class-validator';

export class LikeTradeDto {
  @IsInt()
  @IsNotEmpty()
  tradeId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}