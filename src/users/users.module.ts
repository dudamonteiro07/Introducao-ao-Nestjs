import { Module } from "@nestjs/common";
import { UsersController } from "./users.Controllers";
import { UserService } from "./users.services";
import { PrismaModule } from "src/prisma/prisma.module";


@Module({
    imports: [PrismaModule],
    controllers:[UsersController],
    providers:[UserService]
})
export class UserModule {}