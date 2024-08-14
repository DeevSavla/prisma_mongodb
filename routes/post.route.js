import express from 'express'
import {createPostController,
        updatePostController,
        deletePostController,
        getAllPostsController
        } from '../controllers/post.controller.js'
import {isLoggedIn} from '../middleware/isLoggedIn.js'

const postRouter = express.Router()

postRouter.post('/create-post',isLoggedIn,createPostController)
postRouter.patch('/edit-post/:id',isLoggedIn,updatePostController)
postRouter.get('/get-all-posts',isLoggedIn,getAllPostsController)
postRouter.delete('/delete-post/:id',isLoggedIn,deletePostController)

export {postRouter}