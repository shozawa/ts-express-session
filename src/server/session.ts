import Express from "express";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { REDIS_HOST, REDIS_PORT } from "../constants";

export default (app: Express.Application) => {
  const RedisStore = connectRedis(session);
  const client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
  });
  const option = {
    store: new RedisStore({ client }),
    secret: "keyboard cat",
    resave: false
  };
  app.use(session(option));
};
