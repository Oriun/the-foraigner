import Ajv from "ajv";
import { RequestHandler } from "express";
import { BadRequest, Unexpected } from "../views/Errors";

/**
 * 
 * 
 * 
 * Lightweight middleware to validate requests with
 * a JSON Schema (https://json-schema.org/specification.html)
 * 
 * Ex:
 * 
 * import checkSchema from 'middlewares/RequestSchema.js
import { RequestHandler } from 'express';
 * import { emailValidator } from 'constantes.js'
 * 
 * const loginSchema = {
 *  body: {
 *    type: "object",
 *    required: ["email", "password"],
 *    properties: {
 *      email: {
 *        type: "string",
 *        pattern: emailValidator.toString().slice(1, -1),
 *      },
 *      password: {
 *        type: "string",
 *        minLength: 8,
 *      },
 *    },
 *  },
 * };
 * 
 * ...
 * 
 * router.post("/login", checkSchema(loginSchema), UserController.login);
 * 
 * 
 */


const ajv = new Ajv({
  verbose: false,
});

/**
 * It takes a schema, and returns a middleware function that validates the request against the schema.
 * @param schema - {
 * @returns A function that takes in a request, response, and next function.
 */
export default function checkSchema(schema: any): RequestHandler {
  const validate = ajv.compile({
    $async: true,
    type: "object",
    properties: schema,
  });

  return async function (req, res, next) {
    await (validate({
      body: req.body,
      query: req.query,
      params: req.params,
      cookies: req.cookies,
      headers: req.headers,
    }) as unknown as Promise<any>)
      .then(() => {
        next();
      })
      .catch(({ errors: [error] }) => {
        BadRequest(res, error.instancePath.slice(1).replace(/\//gmi, '.') + " " + error.message)
      })
      .catch(Unexpected.bind(null,res));
  };
}
