import { ConflictException, Injectable} from '@nestjs/common';
import { PrismaService } from 'src/core/db/prisma.service';
import { CreateUserDto } from './dto.ts/create.user.dto';
import { UpdateUserDto } from './dto.ts/update.user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma : PrismaService){}

    async get_user(id:number){
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async get_users(){
        return await this.prisma.user.findMany();
    }
    async  create_user(payload: CreateUserDto){
        return await this.prisma.user.create({data:payload})
    }
    async update_user(id:number,payload: UpdateUserDto){
        
        return await this.prisma.user.update({
            where:{id},data:payload
        })
    }
    async delete_user(id:number){
        return await this.prisma.user.delete({
            where:{id}
        })
    }
    
}
