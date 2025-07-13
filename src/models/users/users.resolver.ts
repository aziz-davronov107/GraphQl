import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './schema.users.ts/schema';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto.ts/create.user.dto';
import { UpdateUserDto } from './dto.ts/update.user.dto';
import { Post } from './schema.users.ts/post.schema';

@Resolver(
    ()=> User
)
export class UsersResolver {
    constructor(private readonly userService: UsersService){}
    @Query(()=>User,{ nullable: true })
    async get_user(@Args('id', { type: () => Int }) id : number){
        return await this.userService.get_user(id)
    }
    @Query(()=>[User],{ nullable: true })
    async get_users(){
        return await this.userService.get_users()
    }
    
    @ResolveField(() => [Post], { nullable: true })
    async posts(@Parent() user: User): Promise<Post[]> {
        return this.userService.get_posts_by_author(user.id);
    }

    @Mutation(() => User,{ nullable: true })
    async create_user(@Args('payload') payload: CreateUserDto){
        return await this.userService.create_user(payload)
    }
    @Mutation(() => User,{ nullable: true })
    async update_user(@Args('id',{type: () => Int}) id : number,@Args('payload') payload: UpdateUserDto){
        return await this.userService.update_user(id,payload)
    }

    @Mutation(() => User,{ nullable: true })
    async delete_user(@Args('id',{type: () => Int}) id : number){
        return await this.userService.delete_user(id)
    }
}
