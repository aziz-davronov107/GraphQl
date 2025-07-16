import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateType } from './dto/create.type';
import { Tokens } from './dto/create.dto';

@Resolver()
export class AuthResolver {
    constructor (private readonly authService : AuthService) { }
    @Query(() => String)
    hello(data:string) {
        return 'Hello World!';
    }
    @Mutation(() => Tokens)
    async register(data: CreateType){
        return this.authService.register(data)
    }
}
