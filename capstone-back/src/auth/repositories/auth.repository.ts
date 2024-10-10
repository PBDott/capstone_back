import { PrismaService } from "src/prisma.service";
import { RegisterUserDto } from "../dto/register-user.dto";
import { Injectable } from "@nestjs/common";
@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) {}

    async registerUser(registerUserData: RegisterUserDto) {
        return this.prisma.user.create({
            data: {
                nickName: registerUserData.nickName,
                name: registerUserData.name,
                email: registerUserData.email,
                phone: registerUserData.phone,
                school: registerUserData.school,
                major: registerUserData.major,
                studentId: registerUserData.studentId
           },
        })
    }
}