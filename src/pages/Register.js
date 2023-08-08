import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Box, Typography, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RegistrationModal from "../components/RegistrationModal";

const RegisterForm = () => {
  // State variables to store form input values and error messages
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  // Navigation hook to redirect to other pages
  const navigate = useNavigate();

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevents mouse down event on password visibility icon
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous error messages
    setNameError("");
    setUserNameError("");
    setPasswordError("");
    setEmailError("");

    // Validate form input values
    if (name === "") {
      setNameError("Please enter name");
    } else if (!nameRegex.test(name)) {
      setNameError(
        <>
          Please enter a valid name <br /> (only letters and spaces allowed)
        </>
      );
    }

    if (username === "") {
      setUserNameError("Please enter username");
    } else if (!usernameRegex.test(username)) {
      setUserNameError(
        <>
          Please enter a valid username <br /> (letters, numbers, and
          underscores allowed)
        </>
      );
    }

    if (password === "") {
      setPasswordError("Please enter password");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        <>
          Password must be at least 8 characters long <br /> and contain at
          least one letter and one number.
        </>
      );
    }

    if (email === "") {
      setEmailError("Please enter email");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    }

    // If all validations pass, display modal with success message
    if (
      nameRegex.test(name) &&
      usernameRegex.test(username) &&
      passwordRegex.test(password) &&
      emailRegex.test(email)
    ) {
      setOpen(true);
    }
  };

  return (
    <Box className="main-container">
      <Box
        sx={{
          maxWidth: "780px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#0eaf94",
            fontWeight: 600,
            letterSpacing: "3px",
            fontFamily: "Lato, sans-serif",
          }}
        >
          REGISTER
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Text field for Name input */}
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
                sx={{ width: "350px", marginBottom: "55px" }}
                rows={4}
                className="textfield-margin"
              />
              {/* Display error message for Name input if it has an error */}
              {nameError && <div className="error-message">{nameError}</div>}
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Text field for Username input */}
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
                sx={{ width: "350px", marginBottom: "55px" }}
                rows={4}
                className="textfield-margin"
              />
              {/* Display error message for Username input if it has an error */}
              {userNameError && (
                <div className="error-message">{userNameError}</div>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Text field for Email input */}
              <TextField
                id="outlined-basic"
                label={
                  <>
                    Email <span style={{ color: "red" }}>*</span>
                  </>
                }
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "350px", marginBottom: "55px" }}
                rows={4}
                className="textfield-margin"
              />
              {/* Display error message for Email input if it has an error */}
              {emailError && <div className="error-message">{emailError}</div>}
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Text field for Password input */}
              <TextField
                sx={{ width: "350px", marginBottom: "55px" }}
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
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Text field for Contact Number input */}
              <TextField
                id="outlined-basic"
                label="Contact Number"
                variant="outlined"
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                sx={{ width: "350px", marginBottom: "55px" }}
                rows={4}
                className="textfield-margin"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* File input for Profile Image */}
              <TextField
                name="upload-photo"
                label="Profile Image"
                InputLabelProps={{
                  shrink: true,
                }}
                type="file"
                sx={{ width: "350px", marginBottom: "55px" }}
              />
            </Grid>
          </Grid>

          {/* Modal component to show registration success */}
          <RegistrationModal open={open} handleClose={handleClose} />

          <br />
          <Box
            // className="button-container"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              // className="new-user-bottom"
              sx={{
                fontSize: "15px",
                marginBottom: "10px",
                fontWeight: "600",
                fontFamily: "poppins",
              }}
            >
              Already a user?
              <Link
                component="span"
                onClick={() => {
                  navigate("login");
                }}
                sx={{
                  color: "darkblue",
                  cursor: "pointer",
                  marginLeft: "5px",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </Typography>
            <button type="submit">Register</button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterForm;
