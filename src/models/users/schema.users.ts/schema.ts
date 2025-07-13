import { ObjectType,Field, Int } from "@nestjs/graphql";
import { Post } from "./post.schema";

@ObjectType()
export class User{
    @Field(()=> Int,{ nullable: true })
    id: number

    @Field(()=> String,{ nullable: true })
    name: string

    @Field(()=> Int,{ nullable: true })
    age: number
    @Field(() => [Post], { nullable: true })
    posts?: Post[];
}