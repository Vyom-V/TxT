const http = require('http');
const express = require('express'); 
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

app.use(cors());

const user = {
    admin:{
        pass:"admin",
        phone: "000",
    },
    a2:{
        pass:"a2",
        phone: "000",
    }
}

// async function name() {
//     return await bcrypt.hash(12567890,10);
// }

const jsonParser = bodyParser.json()

const server = http.createServer(app);

app.post('/login', jsonParser ,(req,res)=>{
    try{
        // if(req.body.u == user[0].uname && req.body.p == user[0].pass){
        if(user[req.body.u]!==undefined && user[req.body.u].pass === req.body.p){
            res.send({auth:true,red:'http://localhost:3000/chat'})
        }
        else res.send({auth:false})
    }catch(error){
        console.log(error);
    }
})

app.post('/register', jsonParser ,(req,res)=>{
    try{
        // if(req.body.u == user[0].uname && req.body.p == user[0].pass){
        if(user[req.body.u]){
            res.send({auth:false})
        }
        else{
            user[req.body.u] = { pass : req.body.p, phone : req.body.no}

            if(user[req.body.u]){
                console.log(user);
                res.send({auth:true,red:'http://localhost:3000/chat'})
            }
            else res.send({auth:false})
        }
    }catch(err){
        console.log(err);
    }
})



server.listen(3001,()=>{
    console.log("listening to 3001");
})