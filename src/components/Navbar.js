import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button, Drawer } from "@mui/material";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
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
              Kanben
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
