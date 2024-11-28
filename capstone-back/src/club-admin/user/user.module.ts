import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma.module";
import { UserCotroller } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./repositories/user.repository";

@Module({
    imports: [PrismaModule],
    controllers: [UserCotroller],
    providers: [UserService, UserRepository],
})

export class UserModule {}