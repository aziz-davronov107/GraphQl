import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './schema';

@ObjectType()
export class Post {
    @Field(() => Int,{nullable:true})
    id: number;

    @Field({nullable:true})
    title: string;

    @Field({nullable:true})
    body: string;

    @Field(() => Int,{nullable:true})
    authorId: number;

    @Field(() => User)
    author: User; // join uchun
}