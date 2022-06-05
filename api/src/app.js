import Cors from 'cors'
import path from 'path'
import DotEnv from 'dotenv'
import Express from 'express'
import Mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import BodyParser from 'body-parser';
import Router from './routes/index.js';
import { cleanExit } from './utils.js';
import CookieParser from "cookie-parser";
import Log, { Access } from "./logger.js";
import RedisClient from './models/Redis.js';
import { mongoUrl, PORT } from './constantes.js';
DotEnv.config({
    path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../../.env')
});
cleanExit()

export const App = Express();

// Useful Middlewares
App.use(
    Cors({
        origin: [process.env.FRONT_URL || "http://localhost:3000"],
        credentials: true,
    })
);
App.use(CookieParser());
App.use(Access());
App.use(BodyParser.json());
App.use('/api', Router);

App.get("/", (req, res) => {
    res.send("The Foraigner Api");
});

App.get('/version', (req, res) => {
    res.send(process.env.COMMIT_HASH || null)
})

export function mongooseConnect(attemptsLeft = 10) {
    return Mongoose.connect(mongoUrl)
        .then(() => {
            Log.info("Successfully connected to the database");
        })
        .catch((err) => {
            console.error(err);
            if (attemptsLeft) {
                Log.error("Could not connect to the database. Retrying...");
                return new Promise(r => setTimeout(
                    () => r(mongooseConnect(attemptsLeft - 1)),
                    5000
                ));
            }
            Log.error(
                "Could not connect to the database. Maximum attempt exceeded. Aborting process"
            );
            process.exit(1);
        });
}

function redisConnect(attemptsLeft = 10) {
    RedisClient.connect()
        .then(async () => {
            Log.info("Successfully connected to the database");
        })
        .catch((err) => {
            console.error(err);
            if (attemptsLeft) {
                Log.error("Could not connect to the redis. Retrying...");
                return setTimeout(
                    () => redisConnect(attemptsLeft - 1),
                    5000
                );
            }
            Log.error(
                "Could not connect to the redis. Maximum attempt exceeded. Aborting process"
            );
        });
}

if (!PORT) {
    console.log('Don\'t forget to use an environment file')
    process.exit(0)
}
export function startAppOnly() {
    return new Promise(function (resolve, reject) {
        App.listen(PORT, "0.0.0.0", function (err) {
            if (err) reject(err)
            console.log(`App running on port ${PORT}.`);
            Log.info(`App started on port${PORT} at${Date.now()}`)
            resolve()
        })
    })
}

export default function FullStart() {
    console.log('FullStart')
    mongooseConnect(10)
        .then(() => redisConnect(10))
        .then(startAppOnly)
}