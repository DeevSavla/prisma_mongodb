import express from 'express'
import {createPostController,updatePostController} from '../controllers/post.controller.js'
import {isLoggedIn} from '../middleware/isLoggedIn.js'

const postRouter = express.Router()

postRouter.post('/createpost',isLoggedIn,createPostController)
postRouter.patch('/editpost',isLoggedIn,updatePostController)

export {postRouter}