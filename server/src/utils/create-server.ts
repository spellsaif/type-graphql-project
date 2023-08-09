import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import express, { json } from "express";
import session from 'express-session';
import { buildSchema } from "type-graphql";
import http from 'http';
import { MyContext } from "..";
import { sessionConfig } from "../config/session.config";
import { UserResolver } from "../modules/user/user.resolver";



export default async function createServer() {
    const app = express();

    /*MIDDLEWARES*/
    //Session
    app.use(session(sessionConfig))

    const schema = await buildSchema({
        resolvers: [UserResolver],
    })


    const httpServer = http.createServer(app);

    const server = new ApolloServer<MyContext>({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ includeCookies: true })
        ]
    })

    await server.start();


    app.use('/graphql', cors<cors.CorsRequest>({
        credentials: true,
        origin: "http://localhost:3000"
    }),
        json(), expressMiddleware(server, {
            context: async ({ req }) => ({ req })
        }));


    return { app, httpServer };
}