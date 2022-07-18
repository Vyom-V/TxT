import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./login.css";

let username, pass;

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = () => {
    username = user;
    axios
    .post("http://localhost:3001/do-login", {
      u: user, 
      p: pwd 
    })
    .then((res) => {
      console.log(res);
      if (res.data.auth === false) alert("wrong username or pass");
      else window.location.href = `${res.data.red}?name=${user}` ;
    });
    setUser("");
    setPwd("");
  };

  return (
    <div className="back">
      <div className="login shadow-drop-2-center">
        <h1>LOGIN</h1>
        <div className="tb">
          <TextField
            onChange={(e) => {
              setUser(e.target.value);
            }}
            inputProps={{ style: { color: "white" } }}
            label="username"
            variant="filled"
            color="warning"
            value={user}
            required
          />
        </div>
        <div className="tb">
          <TextField
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            inputProps={{ style: { color: "white" } }}
            label="password"
            variant="filled"
            color="warning"
            type="password"
            value={pwd}
            required
          />
        </div>
          <Button
            onClick={handleSubmit}
            className="btn"
            variant="contained"
            color="error"
            disabled={user === "" || pwd === ""}
          >
            submit
          </Button>
        <Link to='/register'><span>register</span></Link>
      </div>
    </div>
  );
};

export default Login;
export { username, pass };
