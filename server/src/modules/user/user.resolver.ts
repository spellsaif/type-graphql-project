import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserInput, UserResponse } from "./user.schema";
import { hash, compare } from 'bcrypt';
import { MyContext } from "../..";

@Resolver()
export class UserResolver {

    @Query(() => String)
    hello(@Ctx() { req }: MyContext) {
        console.log(req.session.userId)
        return `Session ID: ${req.session.userId}`
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('option') option: UserInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {

        //check whether already exist or not
        const user = await User.findOne({ where: { username: option.username } })


        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "username doesn'nt exist!"
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
                        message: "Incorrect Password!"
                    }
                ],
            }
        }


        req.session.userId = user.id;
        console.log(req.session.userId)


        return {
            user
        }

    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('option') option: UserInput,
        @Ctx() { req }: MyContext
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

        req.session.userId = user.id;
        console.log(req.session.userId)

        return {
            user
        }

    }
}