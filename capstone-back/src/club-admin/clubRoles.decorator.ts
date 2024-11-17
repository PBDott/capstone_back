import { SetMetadata } from '@nestjs/common';

export const ClubRoles = (...roles: string[]) => SetMetadata('roles', roles);
