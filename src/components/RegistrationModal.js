import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function RegistrationModal({ open, handleClose }) {
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

  const navigate = useNavigate();

  return (
    <div>
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
    </div>
  );
}

export default RegistrationModal;
