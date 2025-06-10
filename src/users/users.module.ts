import { Module } from "@nestjs/common";
import { UsersController } from "./users.Controllers";
import { UserService } from "./users.services";

@Module({
    controllers:[UsersController],
    providers:[UserService]
})
export class UserModule{}