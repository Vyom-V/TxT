// import "./App.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./Cp.css";

// import AddPhoto from "@mui/icons-material/AddPhotoAlternate";
import AddIcon from '@mui/icons-material/AddOutlined';
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const compressImage = require('./ImageCompression') //image compressing fucntion
const socket = io("http://localhost:4000");

let username;

const scrollbottom = () => {
  const txtArea = document.getElementById("messages");
  txtArea.scrollTop = txtArea.scrollHeight;
};

const addMessage = (mes, self, uname) => {
  const msg = document.getElementById("messages");
  const newMsg = document.createElement("span");
  const userName = document.createElement("div");
  const mesContainer = document.createElement("div");

  userName.innerText = uname;
  newMsg.innerHTML = mes;

  mesContainer.append(userName);
  mesContainer.append(newMsg);

  userName.classList.add("uname");
  mesContainer.classList.add("txt");

  if (self) {
    userName.classList.add("sent");
    mesContainer.classList.add("sent");
  } else {
    userName.classList.add("recvd");
    mesContainer.classList.add("recvd");
  }

  msg.append(mesContainer);

  scrollbottom();
};


function calcImageSize(image) {
  let y = 1;
  if (image.endsWith('==')) {
      y = 2
  }
  const x_size = (image.length * (3 / 4)) - y
  return Math.round(x_size / 1024)
}

const imageToBase64 = async (image) => {

  const res = await new Promise((resolve)=>{

    let fileReader = new FileReader();
    
    //after converted to string this fucntion runs
    fileReader.addEventListener("load",()=>{
      resolve(fileReader.result);
    })
    //if image exist then read as 64 bit string
    if(image) fileReader.readAsDataURL(image);
  })

  return res;
}

const sendImage = async (event) => {
  // console.log(event.target.files[0]);
  // event.target.files[0] has newly selected file
  let image = event.target.files[0];
  
  //covering image to base64 with custom fuction
  let imageInString = await imageToBase64(image);
  
  console.log(calcImageSize(imageInString)); //size before compression

  imageInString = await compressImage(imageInString);

  console.log(calcImageSize(imageInString)); //size after compression

  //adding image into the chatbox and emitting to other users
  let mes = `<img src="${imageInString}" alt="image not found" class="sentImage" />`
  addMessage(mes,true,'you');
  const data = { name: username, txt: mes };
  socket.emit("sent", data);
}

socket.on("received", (data) => {
  addMessage(data.txt, false, data.name);
  console.log(calcImageSize(data.txt)); //received image is the compressed one
});

const ChatPage = () => {
  
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = () => {
    const data = { name: username, txt: msg };
    socket.emit("sent", data);
    addMessage(msg, true, "you");
  };

  const joinRoom = () => {
    if (room !== "") {
      addMessage(`You have connected to Room:${room}`, true, "you");
      socket.emit("join_room", room);

      //clear messages of previous room
      const msgbox = document.getElementById("messages");
      msgbox.innerText = "";

      //get all previous messages in the room
      axios.post("http://localhost:3001/texts", { room }).then((res) => {
        const chatMsgs = res.data.texts;
        chatMsgs.forEach((chatMsg) => {
          if (chatMsg.username === username) {
            addMessage(chatMsg.msg, true, "you");
          } else addMessage(chatMsg.msg, false, chatMsg.username);
        });
      });

      const head = document.getElementById("head");
      head.innerText =  username + " connected to Group: " + room;
    }
  };

  useEffect(() => {
    let params = new URLSearchParams(document.location.search); //accessing username from URL
    username = params.get("name");
    const head = document.getElementById("head");
    head.innerText = username + "'s Messages:";
  }, []);

  return (
    <div>
      <div className="backg">
        <h1 id="head"> Message:</h1>
        <div id="messages" className=".shadow-drop-2-center s4"></div>
        <div className="tbx">
          <TextField
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            inputProps={{ style: { color: "white" } }}
            label="room"
            variant="filled"
            color="warning"
            value={room}
            required
          />
          <Button
            onClick={joinRoom}
            className="btn"
            variant="contained"
            color="error"
            disabled={room === ""}
          >
            Join
          </Button>
          <TextField
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            inputProps={{ style: { color: "white" } }}
            label="message"
            variant="filled"
            color="warning"
            value={msg}
            required
          />
          <Button
            onClick={handleSubmit}
            className="btn"
            variant="contained"
            color="error"
            disabled={msg === "" || room === ""}
          >
            Send
          </Button>
          <Fab 
          // style = {{visibility:'hidden'}}
            id="FAB"
            color="inherit"
            aria-label="add"
            size="small"
            disabled={room === ""}
          >
            <label htmlFor="file">
              <AddIcon/>
            </label>
          </Fab>
          <input
            className="fileIp"
            type="file"
            name="file"
            id="file"
            accept="image/*"
            onChange={(event)=>{
              // console.log('arrow called');
              sendImage(event);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

// <input
//         placeholder="Room Number..."
//         onChange={(event) => {
//           setRoom(event.target.value);
//         }}
//       />
//       <button onClick={joinRoom}> Join Room</button>

// <form onSubmit={sendMessage}>
//         <input
//           id="mesInput"
//           placeholder="Message..."
//         />
//         <button > Send Message</button>
// </form>
