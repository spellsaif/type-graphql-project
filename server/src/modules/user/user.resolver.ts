import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../..";
import myDataSource from "../../utils/db";
import { User, UserInput, UserResponse } from "./user.schema";
import { hash } from 'bcrypt';

@Resolver()
export class UserResolver {

    @Query(() => String)
    hello() {
        return "Hello World"
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('option') option: UserInput,
    ): Promise<UserResponse> {
        //check whether already exist or not
        const user = await User.findOne({ where: { username: option.username } })

        if (user) {
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

        const newUser = await User.create({ ...option }).save();

        return {
            user: newUser
        }

    }
}