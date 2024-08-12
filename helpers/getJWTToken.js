import jwt from 'jsonwebtoken'

export const getJWTToken = (userId) =>{
    return jwt.sign({userId:userId},process.env.JWT_SECRET,{expiresIn:'1 day'})
}