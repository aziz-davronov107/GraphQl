import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Tokens {
  @Field()
  accessToken: string;
}