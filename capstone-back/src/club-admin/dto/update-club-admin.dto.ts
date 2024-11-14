import { PartialType } from '@nestjs/mapped-types';
import { CreateClubAdminDto } from './create-club-admin.dto';

export class UpdateClubAdminDto extends PartialType(CreateClubAdminDto) {}
