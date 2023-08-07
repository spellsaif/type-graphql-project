import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserInput } from "./user.schema";

@Resolver()
export class UserResolver {

    @Query(() => String)
    hello() {
        return "Hello World"
    }

    @Mutation()
    register(@Arg('option') option: UserInput): User {
        const user = {
            username: option.username,
            password: option.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        return user;
    }
}