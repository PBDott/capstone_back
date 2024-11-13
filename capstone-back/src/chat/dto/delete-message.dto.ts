import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteMessageDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    messageId: string;
}
