import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./login.css";


const Register = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/do-register", {
        u: user,
        p: pwd,
        no: phone
      })
      .then((res) => {
        console.log(res);
        if (res.data.auth === false) alert("username already exists");
        else window.location.href = `${res.data.red}?name=${user}`;
      });
    setUser("");
    setPwd("");
    setPhone("");
  };

  return (
    <div className="back">
      <div className="register shadow-drop-2-center">
        <h1>REGISTER</h1>
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
        <div className="tb">
          <TextField
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            inputProps={{ style: { color: "white" } }}
            label="Phone Number"
            variant="filled"
            color="warning"
            value={phone}
            required
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="btn"
          variant="contained"
          color="error"
          disabled={user === "" || pwd === "" || phone ===""}
        >
          submit
        </Button>
        <Link to='/'><span>login</span></Link>
      </div>
    </div>
  );
};

export default Register;
