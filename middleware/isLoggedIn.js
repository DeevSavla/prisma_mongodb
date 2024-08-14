import {prisma} from '../prisma/index.js'
import jwt from 'jsonwebtoken'

//every middleware needs a next and it is only for verification
export const isLoggedIn = async(req,res,next)=>{
    try {
        //req.cookie is a method that helps to access the cookie and then .(the name of the cookie)
        const token = req.cookie.token

        if(!token){
            res.send('Please login')
            throw new Error('You are not logged in') //send a response and next (ideal case)
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

        req.user = await prisma.user.findUnique({
            where:{
                id:decodedToken.userId
            }
        })

        next() //proceed to other middlewares or controllers

    } catch (error) {
        throw new Error(error)
    }
}