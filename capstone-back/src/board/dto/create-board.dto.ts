import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  authorId: number;

  @IsString()
  @IsNotEmpty()
  nickname: string;
}
