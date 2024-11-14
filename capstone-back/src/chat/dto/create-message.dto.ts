import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    room: string;

    @IsString()
    @IsNotEmpty()
    sender: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
