import "./App.css";
// import {  useEffect, useState } from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import ChatPage from "./pages/chat/ChatPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/chat" element={<ChatPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import './App.css';
// import { useEffect, useState } from "react";
// import {io} from 'socket.io-client';

// function App() {

//   const socket = io('http://localhost:4000');

//   // const [room, setRoom] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   // console.log(message);

//   const joinRoom = () => {
//   //   if (room !== "") {
//   //     socket.emit("join_room", room);
//   //   }
//   };

//   const sendMessage = (mes) => {
//     socket.emit("sent",{message});
//     console.log(message);
//   };

//   const addMessage = (mes) => {
//     const msg = document.getElementById('messages');
//     const newMsg = document.createElement("p");
//     newMsg.innerText=mes;
//     msg.append(newMsg);
//   };

//   socket.on("received", (data) => {
//           setMessageReceived(data.message);
//           addMessage(messageReceived);
//     });

//   useEffect(()=>{console.log(message);},[message]);

//   return (
//     <div className="App">
//     <input
//       placeholder="Room Number..."
//       onChange={(event) => {
//         // setRoom(event.target.value);
//       }}
//     />
//      <button onClick={joinRoom}> Join Room</button>
//     <input id="mesInput"
//       placeholder="Message..."
//       onChange={(event) => {
//         setMessage(event.target.value);
//         // console.log(event.target.value);

//       }}
//     />
//     <button onClick={sendMessage}> Send Message</button>
//     <div id="messages">
//       <h1> Message:</h1>
//       {/* {message} */}
//     </div>

//   </div>
//   );
// }

// export default App;

// import './App.css';
// import { useEffect, useState } from "react";
// import {io} from 'socket.io-client';

// const socket = io('http://localhost:4000');

// const addMessage = (mes) => {
//   const msg = document.getElementById('messages');
//   const newMsg = document.createElement("p");
//   newMsg.innerText=mes;
//   msg.append(newMsg);
// };

// const sendMessage = (message) => {
//   socket.emit("sent",{message});
//   console.log(message);
// };

// function App() {

//   // const [room, setRoom] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   // console.log(message);

//   const joinRoom = () => {
//   //   if (room !== "") {
//   //     socket.emit("join_room", room);
//   //   }
//   };

//   useEffect(()=>{
//     socket.on("received", (data) => {
//           setMessageReceived(data.message);
//           addMessage(messageReceived);
//           console.log(message);
//     });
//   },[socket]);

//   return (
//     <div className="App">
//     <input
//       placeholder="Room Number..."
//       onChange={(event) => {
//         // setRoom(event.target.value);
//       }}
//     />
//      <button onClick={joinRoom}> Join Room</button>
//     <input id="mesInput"
//       placeholder="Message..."
//       onChange={(event) => {
//         setMessage(event.target.value);
//         // console.log(event.target.value);

//       }}
//     />
//     <button onClick={sendMessage(message)}> Send Message</button>
//     <div id="messages">
//       <h1> Message:</h1>
//       {/* {message} */}
//     </div>

//   </div>
//   );
// }

// export default App;
