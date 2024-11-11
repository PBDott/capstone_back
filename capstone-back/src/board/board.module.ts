import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './repositories/board.repository';


@Module({
  imports: [PrismaModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
