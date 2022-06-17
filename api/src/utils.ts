import Log from "./logger";

export function randomInteger({ min = 0, max = 1 }) {
    return min + Math.floor(Math.random() * (max - min));
}

let counter = 0;
export function idGenerator() {
    // Mongo-Style
    return (
        Math.floor(Date.now() / 1000).toString(16) +
        randomInteger({ max: 100000000000 }).toString(16).padStart(10, "0") +
        (++counter).toString(16).padStart(6, "0")
    );
}

export function regexToString(regex: RegExp) {
    return regex.toString().slice(1, -1)
}

export function cleanExit() {
    /**
     * 
     * Implement closing behavior that Log the exit code or reason
     * 
     */
    process.stdin.resume(); // so the program will not close instantly

    function exitHandler(exitCode?: number) {
        Log.info("App Terminating...");
        if (exitCode || exitCode === 0) Log.info("Code", exitCode);
        Log.flush()
        process.exit();
    }
    function errorExitHandler(error?: any) {
        Log.info("App Terminating with Error...");
        Log.error(error);
        Log.flush()
        process.exit();
    }

    // do something when app is closing
    process.on("exit", exitHandler);

    // catches ctrl+c event
    process.on("SIGINT", exitHandler);

    // catches "kill pid" (for example: nodemon restart)
    process.on("SIGUSR1", exitHandler);
    process.on("SIGUSR2", exitHandler);

    // catches uncaught exceptions and unhandled rejection
    // process.on("uncaughtException", exitHandler.bind(null, true));
    process.on("uncaughtException", errorExitHandler);
    process.on("unhandledRejection", errorExitHandler);
}