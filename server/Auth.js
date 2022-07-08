const http = require('http');
const express = require('express'); 
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(cors());

const user = [
    {
        uname:"v",
        pass:"v",
    },
]

// async function name() {
//     return await bcrypt.hash(12567890,10);
// }
// console.log(user[0].uname);

const jsonParser = bodyParser.json()

const server = http.createServer(app);

app.post('/login', jsonParser ,(req,res)=>{
    try{
        if(req.body.u == user[0].uname && req.body.p == user[0].pass){
            // res.redirect(307,);
            // console.log('red');
            res.send({auth:true,red:'http://localhost:3000/chat'})
        }
        else res.send({auth:false})
    }catch{
        console.log('error');
    }
})

server.listen(3001,()=>{
    console.log("listening to 3001");
})

