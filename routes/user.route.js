import {signUpController} from '../controllers/user.controller.js'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/signup',signUpController)

export {
    userRouter
}