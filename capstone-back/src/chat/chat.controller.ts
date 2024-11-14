import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('room')
  createRoom(@Body('name') name: string) {
    return this.chatService.createRoom(name);
  }

  @Post('room/:roomId/join')
  joinRoom(@Param('roomId') roomId: string, @Body('userId') userId: string) {
    return this.chatService.joinRoom(roomId, userId);
  }

  @Post('room/:roomId/leave')
  leaveRoom(@Param('roomId') roomId: string, @Body('userId') userId: string) {
    return this.chatService.leaveRoom(roomId, userId);
  }

  @Post('message')
  sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.chatService.sendMessage(createMessageDto);
  }

  @Get('room/:roomId/messages')
  getMessages(@Param('roomId') roomId: string) {
    return this.chatService.getMessagesByRoom(roomId);
  }
}
