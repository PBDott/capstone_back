import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateClubAdminDto {
  @IsNotEmpty()
  @IsInt()
  clubId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}