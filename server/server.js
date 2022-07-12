const express = require('express'); 
const app = express();
const http = require('http');

const mongoose = require('mongoose');
const { Text } = require('./models/Model')

const dbUrl = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'; 

mongoose.connect(dbUrl)
.then(()=>{
    console.log('connected to db');
})
.catch((err)=>{
    console.log(err);
}) 


const io = require("socket.io")(4000,{
    cors: {
        origin : ['http://localhost:3000'],
    },
});

let c=0;
let roomId = '';
io.on("connection", (socket)=>{
    console.log(c++,"ID:"+socket.id);

    socket.on("sent" , (data)=>{
        console.log(roomId,data);
        
        if(roomId){
            //sending message to other nodes
            socket.to(roomId).emit("received",data);  
            // making an entry in the db 
            const room = roomId;
            const username = data.name;
            const textmsg = data.txt;
            const texts = new Text({ room , username , textmsg });
            texts.save().then(err => {console.log(err)})
        }
        else console.log("didnt join room");
    });

    socket.on("join_room",(data)=>{
        // console.log('room',data);
        roomId=data;
        socket.join(data);   
    });
})












// const express = require('express'); 
// const app = express();
// const http = require('http');

// const io = require("socket.io")(4000,{
//     cors: {
//         origin : ['http://localhost:3000'],
//     },
// });

// let c=0;
// io.on("connection", (socket)=>{
//     console.log(c++,"ID:"+socket.id);
//     socket.on("sent",(data)=>{
//             console.log(data);
//             socket.broadcast.emit("received",data);   
//     });
// })


//   const express = require('express'); 
// const app = express();
// const http = require('http');
// const {Server} = require("socket.io");
// const cors = require("cors");

// app.use(cors());
// const server = http.createServer(app);

// const io =new Server(server,{
//     cors: {
//         origin : ['http://localhost:3000'],
//     },
// });

// let c=0;
// io.on("connection", (socket)=>{
//     console.log(c++,"ID:"+socket.id);
//     socket.on('sent',(data)=>{
//             console.log(data);
//             socket.emit('received',data);
//     });
// })


// server.listen(4000  , () => {
//     console.log("SERVER IS RUNNING");
//   });