import { Router } from "express";
import { forbidAuth, forceAuth, needAdmin } from "../middlewares/Auth.js";
import checkSchema from "../middlewares/RequestSchema.js";
import { AuthSchema, RegisterAdminSchema } from "../schemas/AuthSchema.js";
import * as AuthController from '../controllers/AuthController.js'

const AuthRouter = Router()

AuthRouter.post('/register', forbidAuth, checkSchema(AuthSchema), AuthController.register)

AuthRouter.post('/createAdmin', needAdmin, checkSchema(RegisterAdminSchema), AuthController.register)

AuthRouter.post('/logout', forceAuth, AuthController.logout)

AuthRouter.post('/login', forbidAuth, checkSchema(AuthSchema), AuthController.login)

export default AuthRouter