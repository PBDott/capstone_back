import { Injectable } from '@nestjs/common';
import { CreateClubAdminDto } from './dto/create-club-admin.dto';
import { UpdateClubAdminDto } from './dto/update-club-admin.dto';

@Injectable()
export class ClubAdminService {
  create(createClubAdminDto: CreateClubAdminDto) {
    return 'This action adds a new clubAdmin';
  }

  findAll() {
    return `This action returns all clubAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clubAdmin`;
  }

  update(id: number, updateClubAdminDto: UpdateClubAdminDto) {
    return `This action updates a #${id} clubAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} clubAdmin`;
  }
}
