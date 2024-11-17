import { Injectable } from "@nestjs/common";
import { AdminRepository } from "./repositories/admin.repository";
import { Club, User } from "@prisma/client";
import { UpdateClubStatusDto } from "./dto/update-club-status.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

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

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.adminRepository.createUser(createUserDto);
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        return this.adminRepository.updateUser(userId, updateUserDto);
    }

    async deleteUser(userId: number): Promise<User> {
        return this.adminRepository.deleteUser(userId);
    }
}