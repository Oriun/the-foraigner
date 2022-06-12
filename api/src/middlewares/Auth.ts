import { readUserSession } from "../models/Redis";
import { mongoIdValidator, sessionCookieName } from "../constantes";
import { RequestHandler } from 'express';
import { AuthedRequest } from "src/types";

export type AuthMiddleware = (
  allowAnonymous: boolean,
  allowLogged: boolean,
  allowAdmin: boolean
) => RequestHandler;

const middleware : AuthMiddleware = function (
  allowAnonymous,
  allowLogged,
  allowAdmin
) {
  return async function (req: AuthedRequest, res, next) {
    try {
      const sessionId = req.cookies[sessionCookieName];
      if (!sessionId) {
        if (allowAnonymous) {
          return next();
        } else {
          return res.status(401).json({
            code: 401,
            status: "Unauthorized",
            error: "You must be logged in to use this route",
          });
        }
      }
      if (!mongoIdValidator.test(sessionId)) {
        return res.status(400).clearCookie(sessionCookieName).json({
          code: 400,
          status: "Bad Request",
          error: "Sending bad vibes to our auth middleware. You should re-log",
        });
      }

      if (!allowLogged && !allowAdmin) {
        return res.status(403).json({
          code: 403,
          status: "Forbidden",
          error: "You must not be logged to use this endpoint",
        });
      }

      const user = await readUserSession(sessionId);

      if (!user) {
        return res.status(440).clearCookie(sessionCookieName).send({
          code: 440,
          status: "Login Timeout",
          error: "Session has expired. Log in again",
        });
      }

      if ((user.Admin && allowAdmin) || (!user.Admin && allowLogged)) {
        req.user = user;
        return next();
      } else if (allowLogged) {
        return res.status(403).json({
          code: 403,
          status: "Forbidden",
          error: "You must not be admin to use this endpoint",
        });
      } else {
        return res.status(403).json({
          code: 403,
          status: "Forbidden",
          error: "You must be logged as admin to use this endpoint",
        });
      }
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  };
};

export const allowAuth = middleware(true, true, true);
export const forceAuth = middleware(false, true, true);
export const forbidAuth = middleware(true, false, false);
export const needAdmin = middleware(false, false, true);