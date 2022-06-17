import Log from "../logger"
import { idGenerator } from "../utils"
import { Response } from 'express'
/**
 * It returns a response with a status code of 400 and a JSON object with a code, status, and reason.
 * @param response - The response object from the express route
 * @param reason - The reason for the error.
 * @returns A function that takes two parameters, response and reason.
 */
export function BadRequest(response: Response, reason: string) {
    return response.status(400).json({
        code: 400,
        status: "Bad Request",
        reason
    })
}

/**
 * It returns a JSON response with a status code of 401 and a reason for the error.
 * @param response - The response object from the express server.
 * @param [reason=You must have a valid authentication or credentials.] - The reason why the user is
 * unauthorized.
 * @returns A function that returns a response object.
 */
export function UnAuthorized(response: Response, reason = "You must have a valid authentication or credentials.") {
    return response.status(401).json({
        code: 401,
        status: "Unauthorized",
        reason
    })
}

/**
 * It returns a JSON response with a 403 status code
 * @param response - The response object from the Express framework.
 * @param [reason=You don't have access to this ressource.] - The reason why the user is not allowed to
 * access the ressource.
 * @returns A function that returns a response.
 */
export function Forbidden(response: Response, reason = "You don't have access to this ressource.") {
    return response.status(403).json({
        code: 403,
        status: "Forbidden",
        reason
    })
}

/**
 * It returns a 404 response with a JSON body containing the specified reason
 * @param response - The response object from the express route
 * @param [reason=Could not find ressource with the specified criterias] - The reason why the request
 * failed.
 * @returns A function that returns a response object with a status code of 404 and a json object with
 * a code, status and reason.
 */
export function NotFound(response : Response, reason = "Could not find ressource with the specified criterias") {
    return response.status(404).json({
        code: 404,
        status: "Not Found",
        reason
    })
}

/**
 * It takes in a response object and an error object, generates an error id, logs the error, and
 * returns a response with the error id and timestamp.
 * @param response - The response object from the express server
 * @param err - The error object
 * @returns A function that returns a response with a status code of 500 and a JSON object with 
 * a code, status, reason, error_id, and timestamp.
 */
export function Unexpected(response : Response, err: any) {
    const error_id = idGenerator()
    Log.error({ error_id, err })
    return response.status(500).json({
        code: 500,
        status: "Internal Server Error",
        reason: "An unexpected error has occurred within the server. \n" +
            "Please try again later or contact the support with the error id and timestamp.",
        error_id,
        timestamp: Date.now()
    })
}