import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../..";
import { User, UserInput } from "./user.schema";

@Resolver()
export class UserResolver {

    @Query(() => String)
    hello() {
        return "Hello World"
    }

    @Mutation()
    register(
        @Arg('option') option: UserInput,
        @Ctx() ctx: MyContext
    ): User {
        const user = {
            id: 'skdjsdklasjd',
            username: option.username,
            password: option.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        return user;
    }
}