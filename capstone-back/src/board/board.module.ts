import { Module } from "@nestjs/common";
import { BoardController } from "./board.controller";
import { PrismaModule } from "src/prisma.module";
import { BoardService } from "./board.service";
import { BoardRepository } from "./repositories/board.repository";

@Module({
    imports: [PrismaModule],
    controllers: [BoardController],
    providers: [BoardService, BoardRepository],
})
export class BoardModule{}