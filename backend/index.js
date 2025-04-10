const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const userroutes=require('./routes/userroutes')
dotenv.config()

const port=process.env.PORT
const app=express()
app.use(cors())
app.use(express.json())
app.use('/api',userroutes)
app.use(express.urlencoded({extended:false}))
app.listen(port,()=>{
    console.log(`app is runing on port:`,port )
})
