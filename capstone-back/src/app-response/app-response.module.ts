import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma.module";
import { AppResponseController } from "./app-response.controller";
import { AppResponseService } from "./app-response.service";
import { AppResponseRepository } from "./repositories/app-response.repository";

@Module({
    imports: [PrismaModule],
    controllers: [AppResponseController],
    providers: [AppResponseService, AppResponseRepository],
})

export class AppResponseModule {}