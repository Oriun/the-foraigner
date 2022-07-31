import Cors from 'cors'
import Express from 'express'
import Mongoose from 'mongoose';
import BodyParser from 'body-parser';
import Router from './routes/index';
import { cleanExit } from './utils';
import CookieParser from "cookie-parser";
import Log, { Access } from "./logger";
import RedisClient from './models/Redis';
import { mongoUrl, PORT } from './constantes';
cleanExit()

export const App = Express();

// Useful Middlewares
App.use(
    Cors({
        origin: [process.env.FRONT_URL || "http://localhost:3001", "http://localhost:3000"],
        credentials: true,
    })
);

App.use(CookieParser());
App.use(Access());
App.use(BodyParser.json());
App.use('/api', Router);

App.get("/", (_, res) => {
    res.send("The Foraigner Api");
});

App.get('/version', (_, res) => {
    res.send(process.env.COMMIT_HASH || null)
})

export function mongooseConnect(attemptsLeft = 10): Promise<void> {
    console.log('MongoUrl', mongoUrl)
    return Mongoose.connect(mongoUrl)
        .then(() => {
            Log.info("Successfully connected to the database");
        })
        .catch((err) => {
            console.log('yo')
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

function redisConnect(attemptsLeft = 10): Promise<void> {
    return RedisClient.connect()
        .then(async () => {
            Log.info("Successfully connected to the database");
        })
        .catch((err) => {
            console.error(err);
            if (attemptsLeft) {
                Log.error("Could not connect to the redis. Retrying...");
                return new Promise(res => {
                    setTimeout(
                        () => res(redisConnect(attemptsLeft - 1)),
                        5000
                    );
                })
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

export function startAppOnly(): Promise<void> {
    return new Promise<void>(function (resolve, reject) {
        try {
            App.listen(PORT, "0.0.0.0", function () {
                console.log(`App running on port ${PORT}.`);
                Log.info(`App started on port${PORT} at${Date.now()}`)
                resolve()
            })
        } catch (err) {
            reject()
        }
    })
}

export default function FullStart(): Promise<void> {
    console.log('FullStart')
    return mongooseConnect(10)
        .then(() => redisConnect(10))
        .then(startAppOnly)
        .then(()=>console.log('FullStart done'))
}