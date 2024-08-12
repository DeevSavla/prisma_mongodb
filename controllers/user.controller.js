//bring prisma and cookie 
import {prisma} from '../prisma/index.js'
import {cookieToken} from '../utils/cookieToken.js'

//signup 
const signUpController = async (req,res,next)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            throw new Error('Please provide all fields')
        }
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password,
            }
        })
        cookieToken(user,res)
    } catch (error) {
        throw new Error(error)
    }
}

export {
    signUpController,
}