import "reflect-metadata";
import express, { Request } from "express"
import { buildSchema } from "type-graphql";
import { UserResolver } from "./modules/user/user.resolver";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { json } from "body-parser";
import cors from "cors";
import config from 'config';
import http from 'node:http'
import myDataSource from "./utils/db";

export type MyContext = {
    req: Request,
}

async function main() {

    try {
        await myDataSource.initialize();
        console.log("Data source is initialized.")
        const schema = await buildSchema({
            resolvers: [UserResolver],
        })
        const app = express();

        const httpServer = http.createServer(app);

        const server = new ApolloServer<MyContext>({
            schema,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
        })

        await server.start();

        app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server, {
            context: async ({ req }) => ({ req })
        }));

        const SERVER_PORT = config.get('server.port');

        await new Promise<void>((resolve) => httpServer.listen({ port: SERVER_PORT }, resolve));

        console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/graphql`);



    } catch (e) {
        console.log(e);

    }


}

main();


