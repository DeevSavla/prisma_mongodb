import express from 'express'
import { configDotenv } from 'dotenv'
import cookieParser from 'cookie-parser'
import {userRouter,postRouter} from './routes/user.route.js'
//for storing jsonwebtokens 

configDotenv()

const app = express()

//regular middleware
app.use(express.json()) //from req.body we are allowed to use json
app.use(express.urlencoded({extended:true}))

//cookie middleware 
app.use(cookieParser())

app.use('/api/v1/users',userRouter)
app.use('/api/v1/posts',postRouter)

app.get('/', (req,res)=>{
    res.send('Hi')
})

const PORT = process.env.PORT || 3000

app.listen(PORT ,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})