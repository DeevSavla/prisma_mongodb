import {signUpController,loginController,logoutController} from '../controllers/user.controller.js'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/signup',signUpController)
userRouter.post('/login',loginController)
userRouter.get('/logout',logoutController)

export {
    userRouter
}