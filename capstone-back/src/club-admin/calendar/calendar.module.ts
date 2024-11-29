import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma.module";
import { CalendarController } from "./calendar.controller";
import { CalendarService } from "./calendar.service";
import { CalendarRepository } from "./repositories/calendar.repository";

@Module({
    imports: [PrismaModule],
    controllers: [CalendarController],
    providers: [CalendarService, CalendarRepository]
})
export class CalendarModule {}