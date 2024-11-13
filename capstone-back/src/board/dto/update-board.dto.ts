import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsInt()
  @IsNotEmpty()
  boardId: number;

  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  content?: string;
}
