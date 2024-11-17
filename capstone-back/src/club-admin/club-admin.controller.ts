import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClubAdminService } from './club-admin.service';
import { CreateClubAdminDto } from './dto/create-club-admin.dto';
import { UpdateClubAdminDto } from './dto/update-club-admin.dto';

@Controller('club-admin')
export class ClubAdminController {
  constructor(private readonly clubAdminService: ClubAdminService) {}
    

}
