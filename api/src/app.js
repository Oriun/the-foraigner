
import Cors from 'cors'
import DotEnv from 'dotenv'
import Express from 'express'
import Mongoose from 'mongoose';
import BodyParser from 'body-parser';
import Router from './routes/index.js';
import { cleanExit } from './utils.js';
import CookieParser from "cookie-parser";
import Log, { Access } from "./logger.js";
import { mongoUrl2 } from './constantes.js';

DotEnv.config()
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


export function mongooseConnect({
    attemptsLeft,
    runTasks = true,
}) {
    return Mongoose.connect(mongoUrl2, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            Log.info("Successfully connected to the database");
        })
        .catch((err) => {
            console.error(err);
            if (attemptsLeft) {
                Log.error("Could not connect to the database. Retrying...");
                return new Promise(r => setTimeout(
                    () => r(mongooseConnect({ attemptsLeft: attemptsLeft - 1, runTasks })),
                    5000
                ));
            }
            Log.error(
                "Could not connect to the database. Maximum attempt exceeded. Aborting process"
            );
            process.exit(1);
        });
}

const port = process.env.PORT
if (!port) {
    console.log('Don\'t forget to use an environment file')
    process.exit(0)
}
export function startAppOnly() {
    return new Promise(function (resolve, reject) {
        App.listen(port, "0.0.0.0", function (err) {
            if (err) reject(err)
            console.log(`App running on port ${port}.`);
            Log.info(`App started on port${port} at${Date.now()}`)
            resolve()
        })
    })
}

export default function FullStart() {
    console.log('FullStart')
    mongooseConnect({ attemptsLeft: 10 }).then(startAppOnly)
}
