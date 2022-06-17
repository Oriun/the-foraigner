
import { emailValidator } from '../constantes'
import { regexToString } from '../utils'

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
