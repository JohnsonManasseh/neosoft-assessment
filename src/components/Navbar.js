import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GridViewIcon from "@mui/icons-material/GridView";
import AssignmentIcon from "@mui/icons-material/Assignment";

function Navbar() {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLogout = () => {
    localStorage.setItem("login", false);
    navigate("/login");
  };

  const handleDashboardClick = () => {
    navigate("/login/dashboard");
  };

  const handleTaskManagementClick = () => {
    navigate("taskmanagement");
  };

  const [state, setState] = React.useState(false);

  const handleClick = () => {
    state(true);
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundImage:
              "linear-gradient(90deg, rgba(24, 90, 157, 1) -8%, rgba(67, 206, 162, 1) 0%, rgba(24, 90, 157, 1) 55%)",
            bgcolor: "rgba(24, 90, 157, 1)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: "1px" }}
            >
              Kanban
            </Typography>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {openDrawer && (
          <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 240,
                boxSizing: "border-box",
              },
              backgroundImage:
                "linear-gradient(90deg, rgba(24, 90, 157, 1) -8%, rgba(67, 206, 162, 1) 0%, rgba(24, 90, 157, 1) 55%)",
              bgcolor: "rgba(24, 90, 157, 1)",
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                {["Dashboard", "Task management"].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={
                        text === "Dashboard"
                          ? handleDashboardClick
                          : handleTaskManagementClick
                      }
                    >
                      <ListItemIcon>
                        {index % 2 === 0 ? (
                          <GridViewIcon sx={{ color: "rgb(24, 90, 157)" }} />
                        ) : (
                          <AssignmentIcon sx={{ color: "rgb(24, 90, 157)" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
        </Box> */}
      </Box>

      {/* <Button onClick={toggleDrawer}>Open Drawer</Button> */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <h4>Dashboard</h4>
        <h4>Task management</h4>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundImage:
              "linear-gradient(90deg, rgba(24, 90, 157, 1) -8%, rgba(67, 206, 162, 1) 0%, rgba(24, 90, 157, 1) 55%)",
            bgcolor: "rgba(24, 90, 157, 1)",
            // Add other styles if needed
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              // open={open}
              // onClose={toggleDrawer}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Kanban
            </Typography>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
