import React, { useState } from "react";
import "../App.css";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Grid } from "@mui/material";
import { Modal, Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 305,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    p: 4,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError("");
    setUserNameError("");
    setPasswordError("");
    setEmailError("");

    if (name === "") {
      setNameError("Please enter name");
      setMessage("");
    }
    if (username === "") {
      setUserNameError("Please enter username");
      setMessage("");
    }
    if (password === "") {
      setPasswordError("Please enter password");
      setMessage("");
    }
    if (email === "") {
      setEmailError("Please enter email");
      setMessage("");
    }
    if (name !== "" && username !== "" && password !== "" && email !== "") {
      setMessage("Registration successful!");
      setOpen(true);
    }
  };

  return (
    <div className="main-container">
      <div className="register-form-container">
        <h3 className="login-title"> REGISTER</h3>
        <br />
        <div className="success-message-container">
          {/* {message && <div className="success-message">{message}</div>} */}
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label={
                  <>
                    Name <span style={{ color: "red" }}>*</span>
                  </>
                }
                variant="outlined"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ width: "350px", marginBottom: "40px" }}
                rows={4}
                className="textfield-margin"
                error="johnson"
              />

              {nameError && <div className="error-message">{nameError}</div>}
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label={
                  <>
                    Username <span style={{ color: "red" }}>*</span>
                  </>
                }
                variant="outlined"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ width: "350px", marginBottom: "40px" }}
                rows={4}
                className="textfield-margin"
              />
              {userNameError && (
                <div className="error-message">{userNameError}</div>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label={
                  <>
                    Email <span style={{ color: "red" }}>*</span>
                  </>
                }
                variant="outlined"
                // type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "350px", marginBottom: "40px" }}
                rows={4}
                className="textfield-margin"
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </Grid>

            <Grid item xs={6}>
              <TextField
                sx={{ width: "350px", marginBottom: "40px" }}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                label={
                  <>
                    Password <span style={{ color: "red" }}>*</span>
                  </>
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                type="number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                sx={{ width: "350px", marginBottom: "40px" }}
                rows={4}
                className="textfield-margin"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="upload-photo"
                label="Profile Image"
                InputLabelProps={{
                  shrink: true,
                }}
                type="file"
                sx={{ width: "350px", marginBottom: "40px" }}
              />
            </Grid>
          </Grid>

          <div className="center-div">
            {/* <Box sx={style}> */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Registration successfull!
                </Typography>
                <br />
                <button
                  onClick={() => {
                    navigate("login");
                  }}
                  type="submit"
                >
                  Login
                </button>
              </Box>
            </Modal>
            {/* </Box> */}
          </div>

          <br />
          <div className="button-container">
            <h3 className="new-user-bottom">
              Already a user?{" "}
              <span
                className="register-span"
                onClick={() => {
                  navigate("login");
                }}
              >
                Login
              </span>
            </h3>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
