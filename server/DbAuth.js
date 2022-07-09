const http = require('http');
const express = require('express'); 
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Users } = require('./models/Model')

app.use(cors());

const server = http.createServer(app);
const jsonParser = bodyParser.json()

const dbUrl = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'; 
let dbo;

mongoose.connect(dbUrl)
.then((db)=>{
    dbo = db; //to access db without mongoose
    // console.log(dbo);
    console.log('connected to db');
    //no use listening for request if db isnt connected 
    //so listen after db connects
    server.listen(3001,()=>{
        console.log("listening to 3001");
    })
})
.catch((err)=>{
    console.log(err);
}) 


app.post('/do-login' ,jsonParser, async (req,res)=>{
    const username = req.body.u;
    const password = req.body.p;
    const q = await Users.find({username})
    // console.log(q);
    if(q[0] && q[0].password === password){
        res.send({auth:true,red:'http://localhost:3000/chat'})
    }
    else res.send({auth:false})
})

app.post('/do-register' ,jsonParser, async(req,res)=>{
    const username = req.body.u;
    const password = req.body.p;
    const phone = req.body.no;
    
    const q = await Users.find({username})

    if(q[0]) {res.send({auth:false})}
    else{
        const usr = new Users({ username,password,phone });
        usr.save()
        .then((result)=>{
            res.send({auth:true,red:'http://localhost:3000/chat'})
        })
        .catch((err)=> { res.send({auth:false}); console.log(err) });
    }
})