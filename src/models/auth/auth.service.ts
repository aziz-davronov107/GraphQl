import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/db/prisma.service';
import { CreateType } from './dto/create.type';

@Injectable()
export class AuthService {
    constructor (
        private readonly prisam : PrismaService,
        private jwtService: JwtService
    ){ }
    async getToken(id:number){
        return {
            access_token: await this.jwtService.signAsync({id})
        }
    }

    async register(payload: CreateType){
        const new_user = this.prisam.user.create({
            data:payload
        })

        const token = await this.getToken(payload.id)
        return token
    }
}

