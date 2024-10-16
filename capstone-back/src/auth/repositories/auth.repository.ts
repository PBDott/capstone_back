import { PrismaService } from "src/prisma.service";
import { RegisterUserDto } from "../dto/register-user.dto";
import { Injectable } from "@nestjs/common";
@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) { }

    async registerUser(registerUserData: RegisterUserDto) {
        return this.prisma.user.create({
            data: {
                kakaoId: registerUserData.kakaoId,
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

    async checkUserExistsByKakaoId(kakaoId: string): Promise<boolean> {
        const user = await this.prisma.user.findFirst({
            where: { kakaoId },
        });
        return user !== null;
    }
    async findUserByKakaoId(kakaoId: string) {
        return this.prisma.user.findFirst({ where: { kakaoId },});
    }
}