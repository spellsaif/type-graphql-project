import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserInput, UserResponse } from "./user.schema";
import { hash, compare } from 'bcrypt';

@Resolver()
export class UserResolver {

    @Query(() => String)
    hello() {
        return "Hello World"
    }

    @Mutation(() => UserResponse)
    async login(@Arg('option') option: UserInput): Promise<UserResponse> {

        //check whether already exist or not
        const user = await User.findOne({ where: { username: option.username } })

        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "Invalid Credentials!"
                    }
                ],
            }
        }

        //checking password

        const valid = await compare(option.password, user.password);

        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Invalid Credentials!"
                    }
                ],
            }
        }

        return {
            user
        }

    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('option') option: UserInput,
    ): Promise<UserResponse> {
        //check whether already exist or not
        const exist = await User.findOne({ where: { username: option.username } })

        if (exist) {
            return {
                errors: [
                    {
                        field: "username",
                        message: " username already exists!"
                    }
                ],
            }
        }



        option.password = await hash(option.password, 10);

        const user = await User.create({ ...option }).save();

        return {
            user
        }

    }
}