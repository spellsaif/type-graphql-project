import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../..";
import myDataSource from "../../utils/db";
import { User, UserInput } from "./user.schema";
import { hash } from 'bcrypt';

@Resolver()
export class UserResolver {

    @Query(() => String)
    hello() {
        return "Hello World"
    }

    @Mutation(() => User)
    async register(
        @Arg('option') option: UserInput,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const userRepository = myDataSource.getRepository(User);
        //check whether already exist or not
        const user = await userRepository.findOne({ where: { username: option.username } })

        if (user) {
            return null;
        }

        option.password = await hash(option.password, 10);

        const newUser = await userRepository.create({ ...option }).save();

        return newUser;

    }
}