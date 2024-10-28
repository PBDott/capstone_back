import { Injectable } from "@nestjs/common";
import { AdminRepository } from "./repositories/admin.repository";
import { Club, User } from "@prisma/client";
import { UpdateClubStatusDto } from "./dto/update-club-status.dto";

@Injectable()
export class AdminService {
    constructor(private readonly adminRepository: AdminRepository) {}

    async changeAdmin(userId: number): Promise<User> {
        return this.adminRepository.changeAdmin(userId);
    }

    async getPendingClubs(): Promise<Club[]> {
        return this.adminRepository.getPendingClubs();
    }

    async updateClubStatus(updateClubStatusDto: UpdateClubStatusDto): Promise<Club> {
        return this.adminRepository.updateClubStatus(updateClubStatusDto);
    }

    async getAllUsers(): Promise<User[]> {
        return this.adminRepository.getAllUsers();
    }
}