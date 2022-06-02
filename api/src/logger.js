import Morgan from "morgan";
import Pino from "pino";
import FS from "fs";

/**
 * 
 * 
 * 
 * Asynchronous* logger module that write
 * each log level in a diffrent type,
 * with a JSON style and UNIX timestamp.
 * 
 * ** Errors are logged synchrounously 
 * 
 * Use : Log.info('some text'); Log.debug({ txt: "You can even put objects" })
 */

const logDir = process.env.LOG_DIR || "./log"
try {
  FS.mkdirSync(logDir);
} catch (e) {}

const Log = Pino(
  { level: "debug" },
  Pino.multistream([
    {
      level: "debug",
      stream: Pino.destination({
        dest: logDir + "/debug.log",
        minLength: 1024, // Buffer before writing
        sync: false, // Asynchronous logging
      }),
    },
    {
      level: "info",
      stream: Pino.destination({
        dest: logDir + "/info.log",
        minLength: 4096, // Buffer before writing
        sync: false, // Asynchronous logging
      }),
    },
    {
      level: "error",
      stream: Pino.destination({
        dest: logDir + "/error.log",
        sync: true,
      }),
    },
  ])
);

setInterval(function () {
  Log.flush()
}, 10_000).unref()

// short => :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
export const Access = () =>
  Morgan(
    function (tokens, req, res) {
      return [
        Date.now(),
        tokens.method(req, res),
        tokens.url(req, res),
        'HTTP/'+tokens['http-version'](req,res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        "| params:"+JSON.stringify(req.params),
        "| query:"+JSON.stringify(req.query),
        "| cookies:"+JSON.stringify(req.cookies),
      ].join(" ");
    },
    {
      stream: Pino.destination({
        dest: logDir + "/access.log",
        // minLength: 4096,
        sync: true,
      }),
    }
  );

export default Log;