// LoginForm.js (Main Form Component)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  setName,
  setPassword,
  setRecaptcha,
} from "../store/LoginSlice";
import { Box } from "@mui/material";

const LoginForm = () => {
  // State variables to store form input values and error messages
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [verified, setVerified] = useState(false);

  // Redux hooks to access the store and dispatch actions
  const dispatch = useDispatch();
  const { name, password, recaptcha } = useSelector((state) => state.loginForm);

  // Navigation hook to redirect to other pages
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevents mouse down event on password visibility icon
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Function to handle reCAPTCHA change and update store
  const handleRecaptchaChange = (value) => {
    dispatch(setRecaptcha(value));
    setRecaptchaError("");
    dispatch(setVerified(true));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous error messages
    setNameError("");
    setPasswordError("");

    // Validate form input values
    if (name === "") {
      setNameError("Please enter username/email");
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

    // Check if there are no errors and user is verified, then proceed with login
    if (nameError === "" && passwordError === "" && verified === true) {
      // Perform login action (e.g., dispatching an action to Redux store)
      dispatch(loginUser({ name, password }));
      // Navigate to dashboard after successful login
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
          {/* Text field for Username/Email input */}
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
            onChange={(e) => dispatch(setName(e.target.value))}
            sx={{ width: "350px", marginBottom: "55px" }}
            rows={4}
            className="textfield-margin"
          />
          {/* Display error message for Username/Email input if it has an error */}
          {nameError && <div className="error-message">{nameError}</div>}

          {/* Text field for Password input */}
          <TextField
            sx={{ width: "350px", marginBottom: "55px" }}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            label={
              <>
                Password<span style={{ color: "red" }}>*</span>
              </>
            }
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* IconButton to toggle password visibility */}
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
          {/* Display error message for Password input if it has an error */}
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* ReCAPTCHA component */}
            <ReCAPTCHA
              sitekey="6LcAphMnAAAAAAJUXfDSLJZKj4hOD5E4djRONdWR"
              onChange={handleRecaptchaChange}
            />
          </Box>
          <br />
          {/* Display error message for ReCAPTCHA if it has an error */}
          {recaptchaError && (
            <div className="captcha-error-message">{recaptchaError}</div>
          )}
          <br />
          <div className="button-container">
            <h3 className="new-user-bottom">
              New user? {/* Button to navigate to registration page */}
              <span
                className="register-span"
                onClick={() => {
                  navigate("/");
                }}
              >
                Register
              </span>
            </h3>
            {/* Button to submit the form and perform login */}
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
