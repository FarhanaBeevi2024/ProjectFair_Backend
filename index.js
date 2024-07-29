//import dotenv - to load environment variable.
require('dotenv').config()

//import express
const express = require('express')

//import cors
const cors = require('cors')

//import router
const router = require('./routes')

//application specific middleware
// require('./middleware/appMiddleware')

//import connection.js
require('./connection')

//create express server
//creates an express application. The express() function is a top-level function exported by the express module.
const projFileServer = express()

//use of cors - to communicate with the view.
projFileServer.use(cors())

//server should use json () method - returns a middleware which can parse json format.
projFileServer.use(express.json())

//use router
projFileServer.use(router)

//to export upload folder from the server side in the client side
//first argument should be the name in which we are using the folder in the client side
//second argument - static method to export the folder
//static method should have the path of the export folder
projFileServer.use('/uploads',express.static('./uploads'))

//set port for the server
PORT = 4000 || process.env.PORT

//listen to the port - to resolve the request
projFileServer.listen(PORT,()=>{
    console.log(`server running successfully at port number : ${PORT}`);
})

//get request
// projFileServer.get('/', (req,res)=>{
//     //logic
//     res.send('get request received')
// })

//post request
// projFileServer.post('/', (req,res)=>{
//     //logic
//     res.send('post request received')
// })

//put request
// projFileServer.put('/', (req,res)=>{
//     //logic
//     res.send('put request received')
// })