declare namespace NodeJS {
    export interface ProcessEnv {
        DB_URI: string;
        REDIS_URL: string;
    }
}