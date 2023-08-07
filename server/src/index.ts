import "reflect-metadata";
import express from "express"
import { buildSchema } from "type-graphql";
import { UserResolver } from "./modules/user/user.resolver";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import { json } from "body-parser";

async function main() {
    const schema = await buildSchema({
        resolvers: [UserResolver],
    })

    const app = express();

    const server = new ApolloServer({
        schema
    })

    await server.start();

    app.use('/graphql', json(), expressMiddleware(server));

    app.listen(4000, () => {
        console.log("Listening to http://localhost:4000");
    })

}

main();


