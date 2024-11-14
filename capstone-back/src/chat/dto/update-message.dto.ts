import { IsOptional, IsString, IsNotEmpty, IsUUID, IsDefined } from "class-validator";

export class UpdateMessageDto {
    @IsDefined()
    @IsUUID()
    messageId: String;

    @IsOptional()
    @IsString()
    room?: string;

    @IsOptional()
    @IsString()
    sender?: string;

    @IsOptional()
    @IsString()
    message?: string;
}