import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Modal,
  IconButton,
  Button,
  TextField,
  Grid,
  InputLabel,
  Box,
  Select,
  Container,
  Breadcrumbs,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 405,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  p: 4,
};

function TaskModal({
  open,
  handleClose,
  name,
  setName,
  taskNameError,
  stage,
  setStage,
  stageError,
  priority,
  setPriority,
  priorityError,
  setDate,
  date,
  dateError,
  addCard,
}) {
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
            Create Task
          </Typography>
          <br />
          <Box sx={{ minWidth: 120 }}>
            <TextField
              id="outlined-basic"
              label={
                <>
                  Task name <span style={{ color: "red" }}>*</span>
                </>
              }
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: "350px", marginBottom: "40px" }}
              rows={4}
              className="textfield-margin"
            />
            {taskNameError && (
              <div className="error-message">{taskNameError}</div>
            )}
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Stage <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stage}
                label={
                  <>
                    Stage <span style={{ color: "red" }}>*</span>
                  </>
                }
                onChange={(e) => setStage(e.target.value)}
                sx={{ width: "350px", marginBottom: "40px" }}
              >
                <MenuItem value={0}>Backlog stage</MenuItem>
                <MenuItem value={1}>To Do stage</MenuItem>
                <MenuItem value={2}>Ongoing stage</MenuItem>
                <MenuItem value={3}>Done stage</MenuItem>
              </Select>
            </FormControl>
            {stageError && <div className="error-message">{stageError}</div>}
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Priority <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label={
                  <>
                    Stage <span style={{ color: "red" }}>*</span>
                  </>
                }
                onChange={(e) => setPriority(e.target.value)}
                sx={{ width: "350px", marginBottom: "40px" }}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            {priorityError && (
              <div className="error-message">{priorityError}</div>
            )}
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ width: "350px", marginBottom: "40px" }}
                  components={["DatePicker"]}
                >
                  <DatePicker
                    label={
                      <>
                        Date <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    // sx={{ width: "350px", marginBottom: "40px" }}
                    //   sx={{ width: "400px !important", marginBottom: "40px" }}
                    onChange={(newDate) => {
                      setDate(newDate);
                      console.log(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    value={date}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
            {dateError && <div className="date-error-message">{dateError}</div>}
          </Box>
          <br />
          {/* <LocalizationProvider>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Basic date picker" />
                  </DemoContainer>
                </LocalizationProvider> */}
          <button onClick={addCard} type="submit">
            Add
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default TaskModal;
