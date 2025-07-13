import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PrismaService } from 'src/core/db/prisma.service';

@Module({
  providers: [PrismaService,UsersResolver,UsersService]
})
export class UsersModule {}
