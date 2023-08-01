import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[3], // Adjust the shadow level (0 to 24) as needed
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function Dashboard() {
  const navigate = useNavigate();

  const name = useSelector((state) => state.loginForm.name);

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const handleTaskManagement = () => {
    navigate("taskmanagement");
  };
  const handleLogout = () => {
    navigate("/login");
  };

  const isResponsive = window.innerWidth <= 960;

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Dashboard
    </Link>,
  ];

  return (
    <div>
      <Navbar />
      <Box sx={{ ml: isResponsive ? 0 : "240px", mt: "20px" }}>
        <Container>
          {/* <Typography variant="h3" sx={{ color: "  rgba(67, 206, 162, 1)" }}>
            Welcome johnson
          </Typography> */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <br />
          <h3 style={{ color: "rgba(24, 90, 157, 1)" }}>Welcome {name},</h3>
          <br />
          {/* <h1>dashboard</h1> */}

          <br />
          <h4 style={{ fontSize: "15px" }}> Tasks -</h4>
          <br />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",

              justifyContent: isResponsive ? "center" : "none",
              flexWrap: isResponsive ? "wrap" : "none",
            }}
          >
            <StyledCard
              sx={{
                width: 450,
                marginRight: "20px",
                textAlign: "center",
                marginBottom: "60px",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Total
                </Typography>
                <br />
                <h3>10</h3>
              </CardContent>
            </StyledCard>

            <StyledCard
              sx={{
                width: 450,
                marginRight: "20px",
                textAlign: "center",
                marginBottom: "60px",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Pending
                </Typography>
                <br />
                <h3>10</h3>
              </CardContent>
            </StyledCard>

            <StyledCard
              sx={{ width: 450, textAlign: "center", marginBottom: "60px" }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Completed
                </Typography>
                <br />
                <h3>10</h3>
              </CardContent>
            </StyledCard>
          </Box>
          <br />
          <Box sx={{ textAlign: "end" }}>
            <button
              sx={{ mt: "70px" }}
              type="submit"
              onClick={handleTaskManagement}
            >
              Task management
            </button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Dashboard;
