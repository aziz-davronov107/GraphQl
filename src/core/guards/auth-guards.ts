import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC } from "../decorators/publick.decorator";

@Injectable()
export class AccessTokenGuard extends AuthGuard('access'){
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext):Promise<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const req = ctx.getContext().req;
        let IsPublick = this.reflector.getAllAndOverride<boolean>(PUBLIC,[
            context.getClass(),
            context.getHandler(),
        ]);
        if(IsPublick){
            return true
        }
        context.switchToHttp().getRequest = () => req;
        return await super.canActivate(context) as boolean;
    }
}