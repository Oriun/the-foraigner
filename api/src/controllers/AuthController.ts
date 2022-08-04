
import { hash, compare } from "../services/bcrypt";
import Credentials from "../models/Credentials";
import { createUserSession, deleteUserSession } from "../models/Redis";
import { BadRequest, NotFound, UnAuthorized, Unexpected } from "../views/Errors";
import { oneDayInMilliseconds, sessionCookieName } from "../constantes";
import { RequestHandler } from "express";
import { AuthedRequest } from '../types';

/**
 * It creates a new user and returns a cookie to the user.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The user is being returned a cookie with a session id.
 */
export const register: RequestHandler = async (req: AuthedRequest, res) => {
    try {
        const { password, email, admin } = req.body
        /* Hashing the password. */
        const hashed = await hash(password)
        /* Checking if the user is an admin and if the user is trying to create an admin. */
        const adminCreation = req.user?.admin === true && admin
        /* Creating a new credential object and saving it to the database. */
        const credential = await new Credentials({
            password: hashed,
            email,
            admin: adminCreation,
            confirmed: adminCreation ? Date.now() : undefined
        }).save()
        /* Creating a session for the user. */
        const sessionId = await createUserSession(credential.toObject())
        if(!sessionId) throw new Error('Couldn\'t create session')
        /* Setting the cookie for the user. */
        return res
            .status(201)
            .cookie(sessionCookieName, sessionId, {
                maxAge: oneDayInMilliseconds,
                httpOnly: true,
                sameSite: "lax"
            }).send()
    } catch (err: unknown) {
        if ((err as Error)?.message?.startsWith('E11000')) {
            // Duplicate Email here
            return BadRequest(res, "Email already in use")
        }
        return Unexpected(res, err)
    }
}

/**
 * It deletes the session from the redis database and deletes the cookie from the user's browser
 * @param req - The request object.
 * @param res - The response object.
 * @returns The user's session is being deleted from the redis database and the cookie is being deleted
 * from the user's browser.
 */
export const logout: RequestHandler = async (req, res) => {
    try {
        /* Deleting the session from the redis database. */
        await deleteUserSession(req.cookies[sessionCookieName]);
        /* Deleting the cookie from the user's browser. */
        return res.status(204).clearCookie(sessionCookieName).send();
    } catch (err) {
        return Unexpected(res, err);
    }
}

/**
 * It takes the email and password from the request body, checks if the email is in the database,
 * compares the password that the user entered with the password that is stored in the database,
 * creates a session for the user, sets the cookie for the user, and returns the credential object to
 * the user.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The credential object.
 */
export const login: RequestHandler = async function (req, res) {
    try {
        const { email, password } = req.body;

        /* Checking if the email is in the database. */
        const credential = await Credentials.findOne({ email });
        if (!credential) return NotFound(res, "Couldn't find a user with this email");

        /* Comparing the password that the user entered with the password that is stored in the
        database. */
        const passOk = await compare(password, credential.password);
        if (!passOk) return UnAuthorized(res, "Invalid password");

        /* Creating a session for the user. */
        const sessionId = await createUserSession(credential.toObject());
        if(!sessionId) throw new Error('Couldn\'t create session')

        /* Setting the cookie for the user. */
        return res
            .status(200)
            .cookie(sessionCookieName, sessionId, {
                maxAge: oneDayInMilliseconds,
                httpOnly: true,
                sameSite: "lax"
            })
            /* Returning the credential object to the user. */
            .json(credential.toObject());

    } catch (err) {
        return Unexpected(res, err)
    }
};