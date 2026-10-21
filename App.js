import express from 'express';
//const express = require("express");
import cors from 'cors';
import connectDb from './config/db.js';
import router from "./route/userRoute.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)

const PORT = 5000  	//in backend we will decided on which port it will run

app.get('/',(req,res)=>{
	res.send("backend successfully runs")
})

// app.listen(PORT,()=>{
// 	console.log(`App is running on port localhost://${PORT}`)
// })

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`App is running on port1 localhost://${PORT}`)
    })
})