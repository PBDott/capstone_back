import { IsInt, IsNotEmpty } from 'class-validator';

export class LikeBoardDto {
  @IsInt()
  @IsNotEmpty()
  boardId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}