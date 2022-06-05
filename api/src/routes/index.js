import { Router } from "express";
import AuthRouter from "./auth.js";
import UserRouter from "./users.js"

//import  UserRouter from './users.js';
/**
 * 
 * 
 * Ici rassembler tous les routers du dossier 
 * en un router pour faciliter l'importation
 * 
 * Ex:
 * 
 import UserRouter from './userRouter';
 * ...
 * MainRouter.use('/user', UserRouter)
 * 
 * 
 */

const MainRouter = Router()
MainRouter.use('/user', UserRouter)
MainRouter.use('/auth', AuthRouter)

// route to test

MainRouter.get('/', function(req,res){
    res.send('main router ok')
})

export default MainRouter
