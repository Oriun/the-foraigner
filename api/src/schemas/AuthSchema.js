
import { emailValidator } from '../constantes.js'
import { regexToString } from '../utils.js'

export const AuthSchema = {
 body: {
   type: "object",
   required: ["email", "password"],
   additionalProperties: false,
   properties: {
     email: {
       type: "string",
       pattern: regexToString(emailValidator),
     },
     password: {
       type: "string",
       minLength: 8,
     }
   },
 },
};

export const RegisterAdminSchema = {
 body: {
   type: "object",
   required: ["email", "password"],
   additionalProperties: false,
   properties: {
     email: {
       type: "string",
       pattern: regexToString(emailValidator),
     },
     password: {
       type: "string",
       minLength: 8,
     },
     admin: {
         type: "boolean"
     }
   },
 },
};
