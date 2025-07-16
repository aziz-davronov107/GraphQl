import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateType {
    @Field(()=>Int)
    id: number
    @Field()
    name:string
    @Field()
    age:number
}