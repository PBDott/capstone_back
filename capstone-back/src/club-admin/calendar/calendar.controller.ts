import { Body, Controller, Get, InternalServerErrorException, NotFoundException, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import { CalendarService } from "./calendar.service";
import { ClubRoles } from "../clubRoles.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateCalendarDto } from "./dto/create-calendar.dto";
import { UpdateCalendarDto } from "./dto/update-calendar.dto";

@Controller('club-admin/calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async createCalendar(@Body() createCalendarDto: CreateCalendarDto) {
        try {
            return await this.calendarService.createCalendar(createCalendarDto);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create calendar');
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async getAllCalendars(@Query('clubId', ParseIntPipe) clubId: number) {
        try {
            return await this.calendarService.getAllCalendars(clubId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch calendars');
        }
    }

    @Post('update')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async updateCalendar(@Body() updateCalendarDto: UpdateCalendarDto) {
        const calendarId = updateCalendarDto.calendarId;
        try {
            const calendar = await this.calendarService.updateCalendar(calendarId, updateCalendarDto);
            if (!calendar) {
                throw new NotFoundException(`Calendar with ID ${calendarId} not found`);
            }
            return calendar;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update calendar');
        }
    }

    @Post('delete')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ClubRoles('CLUBADMIN')
    async deleteCalendar(@Body('calendarId', ParseIntPipe) calendarId: number) {
        try {
            const calendar = await this.calendarService.deleteCalendar(calendarId);
            if (!calendar) {
                throw new NotFoundException(`Calendar with ID ${calendarId} not found`);
            }
            return calendar;
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete calendar');
        }
    }
}