import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { UsersController } from './users/users.Controllers';
import { UserService } from './users/users.services';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [UsersController],
  providers: [UserService
  ],
})
export class AppModule {}
