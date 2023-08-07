import { DataSource } from "typeorm";
import { dbConfig } from "../../ormconfig";


const myDataSource = new DataSource(dbConfig)

export default myDataSource;