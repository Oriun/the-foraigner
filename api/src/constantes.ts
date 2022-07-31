import path from 'path'
import DotEnv from 'dotenv'
DotEnv.config({
    path: path.join(__dirname, '../../.env')
});
export const UrlValidator = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const { MONGO_HOST, MONGO_USER, MONGO_PASS, MONGO_DB, SESSION_COOKIE_NAME, REDIS_HOST } = process.env;

export const sessionCookieName =  SESSION_COOKIE_NAME || "session"
export const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?authSource=admin`;
export const redisUrl = `redis://${REDIS_HOST}/`;
export const mongoIdValidator = /^[a-f0-9]{24}$/

export const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const oneDayInSeconds = 60 * 60 * 24
export const oneDayInMilliseconds = oneDayInSeconds * 1000

export const PORT = parseInt(process.env.API_PORT!)