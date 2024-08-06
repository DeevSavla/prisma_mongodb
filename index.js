import express from 'express'
import { configDotenv } from 'dotenv'
import cookieParser from 'cookie-parser'

configDotenv()

const app = express()

//regular middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cookie middleware 
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.send('Hi')
})

const PORT = process.env.PORT || 3000

app.listen(PORT ,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})