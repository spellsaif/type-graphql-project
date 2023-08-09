import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from 'express-session';

const RedisStore = connectRedis(session);
const redis = new Redis("redis://default:SmPHIjx8EUyPsCB9F6K6LWY02LYrKaVT@redis-13108.c301.ap-south-1-1.ec2.cloud.redislabs.com:13108");

export const sessionConfig = {
    name: "qid",
    store: new RedisStore({
        disableTouch: true,
        client: redis
    }),

    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "none",
        secure: false,
    },
    saveUninitialized: false,
    secret: "thisissecret",
    resave: true
} as const