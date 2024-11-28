import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { ReceiptRepository } from './repositories/receipt.respository';


@Module({
  imports: [PrismaModule],
  controllers: [ReceiptController],
  providers: [ReceiptService, ReceiptRepository],
})

export class ReceiptModule {}
