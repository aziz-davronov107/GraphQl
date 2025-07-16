import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../db/prisma.service";


@Injectable()
export class  AccessJwtStrategy extends PassportStrategy(Strategy, 'access'){
    constructor(private prisma : PrismaService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: "yandiev"
        });
    }
    async validate(payload:any){
        let user = this.prisma.user.findUnique(payload.id)
        return user
    }
}
