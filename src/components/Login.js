import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handleLogin = () => {
  //   navigate("dashboard");
  // };

  const handleRecaptchaChange = (value) => {
    // setRecaptchaValue(value);
    setRecaptchaError("");
    setVerified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError("Please enter name");
      setMessage("");
    }
    if (recaptchaValue === "") {
      setRecaptchaError("Please complete the reCAPTCHA");
      setMessage("");
    }
    if (password === "") {
      setPasswordError("Please enter password");
      setMessage("");
    }
    if (nameError === "" && passwordError === "") {
      setMessage("Registration successful!");
    }
    if (name !== "" && password !== "" && verified === true) {
      navigate("dashboard");
    }
  };

  return (
    <div className="main-container">
      <div className="login-form-container">
        <h2 className="login-title">LOGIN</h2>
        <br />
        <div className="success-message-container"></div>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label={
              <>
                Username/Email <span style={{ color: "red" }}>*</span>
              </>
            }
            variant="outlined"
            type="email"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "350px", marginBottom: "40px" }}
            rows={4}
            className="textfield-margin"
          />
          {nameError && <div className="error-message">{nameError}</div>}

          <TextField
            sx={{ width: "350px", marginBottom: "40px" }}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            label={
              <>
                Password<span style={{ color: "red" }}>*</span>
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
          {/* </FormControl> */}

          {/* <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "350px" }}
          /> */}
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
          {/* <br />
          <br /> */}

          <div>
            <ReCAPTCHA
              sitekey="6LcAphMnAAAAAAJUXfDSLJZKj4hOD5E4djRONdWR"
              onChange={handleRecaptchaChange}
              // onExpired={() => setRecaptchaValue("")}
            />
          </div>
          <br />
          {recaptchaError && (
            <div className="error-message">{recaptchaError}</div>
          )}
          <br />
          <div className="button-container">
            <h3 className="new-user-bottom">
              New user?{" "}
              <span
                className="register-span"
                onClick={() => {
                  navigate("/");
                }}
              >
                Register
              </span>
            </h3>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
