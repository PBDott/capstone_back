import { Controller, Post, Body, Param, Get, Req, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'src/common/user.interface';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller(':type/:id/room/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService,

  ) { }
  @Post()
  @UseGuards(JwtAuthGuard)
  async createChat(
    @Body() createChatDto: CreateChatDto,
    @Req() req: Request,
  ) {
    const { message } = createChatDto;
    const { userId, nickName } = req.payload;
    const { type, id } = req.params;
    console.log(createChatDto);
    if (type !== 'club' && type !== 'trade') {
      throw new BadRequestException();
    }
    const roomId = `${type}:${id}`;
    await this.chatService.createChat({ message, roomId, userId });
    this.chatService.triggerBroadcast({ message, userId, nickName, roomId });
    return message;
  }
}
