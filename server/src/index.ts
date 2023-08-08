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
import session, { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import connectRedis from "connect-redis";

export type MyContext = {
    req: Request
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

        const RedisStore = connectRedis(session);
        const redis = new Redis("redis://default:SmPHIjx8EUyPsCB9F6K6LWY02LYrKaVT@redis-13108.c301.ap-south-1-1.ec2.cloud.redislabs.com:13108");

        app.use(session({
            name: "qid",
            store: new RedisStore({
                disableTouch: true,
                client: redis
            }),

            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                httpOnly: true,
                sameSite: "lax",
                secure: false
            },
            saveUninitialized: false,
            secret: "thisissecret",
            resave: false
        }))

        const SERVER_PORT = config.get('server.port');

        await new Promise<void>((resolve) => httpServer.listen({ port: SERVER_PORT }, resolve));

        console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/graphql`);



    } catch (e) {
        console.log(e);

    }


}

main();


