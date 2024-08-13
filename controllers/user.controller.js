//bring prisma and cookie 
import {prisma} from '../prisma/index.js'
import {cookieToken} from '../utils/cookieToken.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

//signup 
const signUpController = async (req,res,next)=>{
    try {
        const {name,email} = req.body
        if(!name || !email || !req.body.password){
            throw new Error('Please provide all fields')
        }
        const salt = bcryptjs.genSaltSync(10)
        const hashedPassword = bcryptjs.hashSync(req.body.password,salt)
        const password = hashedPassword

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:password,
            }
        })
        
        cookieToken(user,res)

    } catch (error) {
        throw new Error(error)
    }
}

const loginController = async(req,res) =>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            throw new Error('Please provide all fields')
        }

        const findUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!findUser){
            throw new Error('User not found')
        }

        const isPasswordCorrect = bcryptjs.compare(password,findUser.password)
        if(!isPasswordCorrect){
            throw new Error('Password Incorrect')
        }
        findUser.password = undefined

        cookieToken(findUser,res)

    } catch (error) {
        throw new Error(error)
    }
}

const logoutController = async(req,res) => {
    try {   
        res.clearCookie('token')

        res.status(200).json({
            success:true,
            message:'Logout Successfull'
        })
    } catch (error) {
        throw new Error(error)
    }
}

export {
    signUpController,
    loginController,
    logoutController,
}