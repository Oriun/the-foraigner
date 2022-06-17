import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express';

// Auth guard for user pages
const authRequired: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            jwt.verify(token, process.env.SECRET_TOKEN as string);
            next()
        }
        catch (err) {
            res.sendStatus(403)
        }

    } else res.sendStatus(401)
};

export default authRequired;