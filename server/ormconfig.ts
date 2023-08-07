import { DataSourceOptions } from "typeorm";
import config from 'config';
import { User } from "./src/modules/user/user.schema";

export const dbConfig: DataSourceOptions = {
    type: "postgres",
    url: "postgres://spellsaif:Q9E1oqBFCcxI@ep-icy-lake-74849568.ap-southeast-1.aws.neon.tech/neondb",
    logging: true,
    synchronize: true,
    entities: [User],
    migrations: ["./migrations"]

}