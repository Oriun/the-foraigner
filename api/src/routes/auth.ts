import { Router } from "express";
import { forbidAuth, forceAuth, needAdmin } from "../middlewares/Auth";
import checkSchema from "../middlewares/RequestSchema";
import { AuthSchema, RegisterAdminSchema } from "../schemas/AuthSchema";
import * as AuthController from '../controllers/AuthController'

const AuthRouter = Router()

AuthRouter.post('/register', forbidAuth, checkSchema(AuthSchema), AuthController.register)

AuthRouter.post('/createAdmin', needAdmin, checkSchema(RegisterAdminSchema), AuthController.register)

AuthRouter.post('/logout', forceAuth, AuthController.logout)

AuthRouter.post('/login', forbidAuth, checkSchema(AuthSchema), AuthController.login)

export default AuthRouter