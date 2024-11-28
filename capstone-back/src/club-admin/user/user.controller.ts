import { Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserCotroller {
    constructor(private readonly userService: UserService) {}

}