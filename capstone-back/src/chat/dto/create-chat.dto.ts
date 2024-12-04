import { IsBoolean, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateChatDto {
  @ValidateIf(o => !o.isImage)
  @IsString()
  message: string | null;

  @IsBoolean()
  @Expose()
  isImage: boolean;

  @ValidateIf(o => o.isImage)
  @IsNumber()
  imageId: number | null;

  constructor(partial: Partial<CreateChatDto>) {
    Object.assign(this, partial);
  }
}
