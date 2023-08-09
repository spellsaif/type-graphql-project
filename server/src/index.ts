import "reflect-metadata";
import { Request, Response } from "express"
import config from 'config';
import myDataSource from "./utils/db";
import { Session } from "express-session";
import dotenv from 'dotenv'

import createServer from "./utils/create-server";


export type MyContext = {
    req: Request & { session?: Session & { userId?: any } }
}

async function main() {

    dotenv.config();

    try {
        await myDataSource.initialize();
        console.log("Data source is initialized.")

        const { app, httpServer } = await createServer();

        app.get("/", (_, res: Response) => {
            res.send("working!!!!")
        })

        const SERVER_PORT = config.get('server.port');

        await new Promise<void>((resolve) => httpServer.listen({ port: SERVER_PORT }, resolve));

        console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/graphql`);



    } catch (e) {
        console.log(e);
    }


}

main();


