import { Module } from "@nestjs/common";
import { BoardController } from "./board.controller";
import { PrismaModule } from "src/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [BoardController],
    providers: [],
})
export class BoardModule{}