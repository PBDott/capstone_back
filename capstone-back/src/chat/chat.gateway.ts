// import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { ChatService } from './chat.service';
// import { CreateMessageDto } from './dto/create-message.dto';

// @WebSocketGateway({
//     namespace: '/chat',
//     cors: {
//     origin: '*',
//     },
// })
// export class ChatGateway {
//     constructor(private readonly chatService: ChatService) {}

//     @WebSocketServer()
//     server: Server;

//     @SubscribeMessage('sendMessage')
//     async handleMessage(
//     @MessageBody() createMessageDto: CreateMessageDto,
//     @ConnectedSocket() client: Socket,
//     ) {
//     const message = await this.chatService.sendMessage(createMessageDto);
//     this.server.to(createMessageDto.room).emit('receiveMessage', message);
//     return message;
//     }

//     @SubscribeMessage('joinRoom')
//     handleJoinRoom(@MessageBody('room') room: string, @ConnectedSocket() client: Socket) {
//     client.join(room);
//     client.emit('joinedRoom', room);
//     }

//     @SubscribeMessage('leaveRoom')
//     handleLeaveRoom(@MessageBody('room') room: string, @ConnectedSocket() client: Socket) {
//     client.leave(room);
//     client.emit('leftRoom', room);
//     }
// }
