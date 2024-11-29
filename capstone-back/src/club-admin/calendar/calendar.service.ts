import { Injectable } from "@nestjs/common";
import { CalendarRepository } from "./repositories/calendar.repository";
import { CreateCalendarDto } from "./dto/create-calendar.dto";
import { UpdateCalendarDto } from "./dto/update-calendar.dto";

@Injectable()
export class CalendarService {
    constructor(private readonly calendarRepository: CalendarRepository) {}

    async createCalendar(createCalendarDto: CreateCalendarDto) {
        return this.calendarRepository.createCalendar(createCalendarDto);
    }

    async getAllCalendars(clubId: number) {
        return this.calendarRepository.getAllCalendars(clubId);
    }

    async updateCalendar(calendarId: number, updateCalendarDto: UpdateCalendarDto) {
        return this.calendarRepository.updateCalendar(calendarId, updateCalendarDto);
    }

    async deleteCalendar(calendarId: number) {
        return this.calendarRepository.deleteCalendar(calendarId);
    }
}