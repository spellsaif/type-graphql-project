import "reflect-metadata";
import express from "express"
import { buildSchema } from "type-graphql";
import { UserResolver } from "./modules/user/user.resolver";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import { json } from "body-parser";
import cors from "cors";
import config from 'config';

async function main() {
    const schema = await buildSchema({
        resolvers: [UserResolver],
    })

    const app = express();

    const server = new ApolloServer({
        schema
    })

    await server.start();

    app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server));

    const SERVER_PORT = config.get('server.port');
    app.listen(SERVER_PORT, () => {
        console.log(`Listening to http://localhost:${SERVER_PORT}`);
    })

}

main();


