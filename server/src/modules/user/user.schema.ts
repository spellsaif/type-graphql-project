import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class User {

    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    createdAt: Date;

    @Field(() => String)
    updatedAt: Date;
}

@InputType()
export class UserInput {

    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;
}