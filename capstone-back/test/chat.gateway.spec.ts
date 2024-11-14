import { io } from 'socket.io-client';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ChatGateway } from 'src/chat/chat.gateway';
import { ChatService } from 'src/chat/chat.service';

describe('ChatGateway (WebSocket)', () => {
  let app: INestApplication;
  let socket: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway, ChatService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    socket = io('http://localhost:3000/chat', {
      transports: ['websocket'],
    });
  });

  it('should join a room', (done) => {
    socket.emit('joinRoom', { room: 'testRoom' });

    socket.on('joinedRoom', (room) => {
      expect(room).toBe('testRoom');
      done();
    });
  });

  it('should send and receive a message', (done) => {
    const message = { room: 'testRoom', userId: 'user1', content: 'Hello!' };

    socket.emit('sendMessage', message);

    socket.on('receiveMessage', (receivedMessage) => {
      expect(receivedMessage.content).toBe(message.content);
      done();
    });
  });

  afterAll(() => {
    socket.disconnect();
    app.close();
  });
});
