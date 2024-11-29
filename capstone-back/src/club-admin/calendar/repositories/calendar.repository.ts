import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateCalendarDto } from "../dto/create-calendar.dto";
import { UpdateCalendarDto } from "../dto/update-calendar.dto";

@Injectable()
export class CalendarRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createCalendar(data: CreateCalendarDto) {
        return this.prisma.calendar.create({ 
            data: {
                date: data.date,
                title: data.title,
                description: data.description,
                club: {
                    connect: { clubId: data.clubId }, 
                },
            }
         });
    }

    async getAllCalendars(clubId: number) {
        return this.prisma.calendar.findMany({ where: { clubId } });
    }

    async updateCalendar(calendarId: number, data: UpdateCalendarDto) {
        return this.prisma.calendar.update({
            where: { calendarId },
            data,
        });
    }

    async deleteCalendar(calendarId: number) {
        return this.prisma.calendar.delete({ where: { calendarId } });
    }
} 