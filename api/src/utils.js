import Log from "./logger.js";

export function cleanExit() {
    /**
     * 
     * Implement closing behavior that Log the exit code or reason
     * 
     */
    process.stdin.resume(); // so the program will not close instantly

    function exitHandler(exitCode) {
        Log.info("App Terminating...");
        if (exitCode || exitCode === 0) Log.info("Code", exitCode);
        Log.flush()
        process.exit();
    }
    function errorExitHandler(error) {
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