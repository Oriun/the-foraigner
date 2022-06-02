import Ajv from "ajv";

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

export default function checkSchema(schema) {
  const validate = ajv.compile({
    $async: true,
    type: "object",
    properties: schema,
  });

  return async function (req, res, next) {
    await validate({
      body: req.body,
      query: req.query,
      params: req.params,
      cookies: req.cookies,
      headers: req.headers,
    })
      .then(() => {
        next();
      })
      .catch(({ errors: [error] }) => {
        res.status(400).json({
          code: 400,
          status: "Bad Request",
          error: error.dataPath.slice(1) + " " + error.message,
        });
      });
  };
}
