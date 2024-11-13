import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBoardCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  parentCommentId?: number; 
}