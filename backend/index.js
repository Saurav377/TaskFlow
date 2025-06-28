require('dotenv').config()

const express = require('express')

const cors = require('cors')

const router = require('./router')

const server = express()
server.use(cors())
server.use(express.json())
server.use(router)

require('./connection')

const PORT = 4000 || process.env.PORT

server.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
    
})

server.get('/',(req,res)=>{
    res.send('Get request recieved')
})