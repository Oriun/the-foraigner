import { Request } from "express";

export type Session = {
    email: string;
    confirmed: number;
    admin: boolean
}
export type AuthedRequest = Request & { user?: Session; };
