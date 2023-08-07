import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import { TextField, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import { useDrag, useDrop } from "react-dnd";
import { useCallback } from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Task from "../components/Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { totalStages } from "../assets/constants/constants";
import TaskContainer from "./TaskContainer.js";
import { useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  updateTask,
  updateActiveStep,
  resetActiveStep,
  updateTaskStage,
  updateTaskStageAction,
} from "../store/TaskSlice"; // Replace '../path/to/reducers/taskSlice' with the correct path to your Redux slice
import { useSelector } from "react-redux";

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

function TaskManagement() {
  const [modal, setModal] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState(null);
  const [stage, setStage] = useState(0);
  // const [task, setTask] = useState([]);
  const [cards, setCards] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState([]);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", activeStep: 0 },
    { id: 2, name: "Task 2", activeStep: 0 },
  ]);
  const [taskNameError, setTaskNameError] = useState("");
  const [stageError, setStageError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [dateError, setDateError] = useState("");
  // const [droppedTask, setDroppedTask] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [droppedTask, setDroppedTask] = useState(null); // State to hold the dropped task

  const task = useSelector((state) => state.task.tasks);

  const generateDroppableId = (index) => `box-droppable-${index}`;

  const dispatch = useDispatch();

  const handleTaskUpdate = () => {
    if (droppedTask !== null) {
      updateTaskStage(droppedTask.id, droppedTask.stage);
      setIsConfirmationOpen(true);
    }
  };

  const updateTaskStage = (taskId, newStage) => {
    dispatch(updateTaskStageAction({ id: taskId, newStage: newStage }));
  };

  useEffect(() => {
    // Open the confirmation modal when droppedTask is set
    if (droppedTask !== null) {
      setIsConfirmationOpen(true);
    }
  }, [droppedTask]);

  const handleTaskDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceStageIndex = parseInt(result.source.droppableId.split("-")[2]);
    const destinationStageIndex = parseInt(
      result.destination.droppableId.split("-")[2]
    );

    if (result.destination.droppableId === "delete-area") {
      const taskId = task[result.source.index].id;
      dispatch(deleteTask(taskId)); // Dispatch the deleteTask action
      return;
    }

    if (sourceStageIndex !== destinationStageIndex) {
      const taskId = task[result.source.index].id;
      dispatch(
        updateTaskStageAction({ id: taskId, newStage: destinationStageIndex })
      ); // Dispatch the updateTaskStageAction action
    }
  };

  function handleClick(event) {
    event.preventDefault();
    navigate("/login/dashboard");
    // navigate to="/dashboard"
    console.info("You clicked a breadcrumb.");
  }

  const CardTypes = {
    CARD: "card",
    CONTAINER: "container",
  };

  const handleDeleteDrop = useCallback(
    (taskId) => {
      setIsConfirmationOpen(true);
      setDroppedTask(task.find((task) => task.id === taskId));
    },
    [task]
  );

  const handleConfirmDelete = () => {
    // Perform the actual task deletion using Redux action
    dispatch(deleteTask(droppedTask.id));

    // Close the confirmation modal
    setIsConfirmationOpen(false);

    // Clear the dropped task
    setDroppedTask(null);

    // Add a console.log statement to check if isConfirmationOpen is false
    console.log("isConfirmationOpen:", isConfirmationOpen);
  };

  const handleCancelDelete = () => {
    // Close the confirmation modal
    setIsConfirmationOpen(false);

    // Clear the dropped task
    setDroppedTask(null);
  };

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
    <Link underline="hover" key="2" color="inherit">
      Task management
    </Link>,
  ];

  const addCard = () => {
    if (name === "") {
      setTaskNameError("Please enter task name");
    }
    if (stage === "") {
      setStageError("Please enter stage");
    }
    if (priority === "") {
      setPriorityError("Please enter Priority");
    }
    if (date === null) {
      setDateError("Please enter Date");
    }
    if (name !== "" && stage !== "" && priority !== "" && date !== "") {
      setTaskNameError("");
      setStageError("");
      setPriorityError("");
      setDateError("");

      const newTask = {
        id: Math.random(),
        name: name,
        priority: priority,
        stage: stage,
        date: date,
        activeStep: 0,
      };
      console.log("New Task to be added:", newTask);
      dispatch(addTask(newTask));

      setName("");
      setPriority("");
      setStage("");
      setDate(null);
      setOpen(false);
    }
  };

  const editCard = () => {
    const updatedTask = {
      id: Math.random(),
      name: name,
      priority: priority,
      stage: stage,
    };

    // const updatedTasks = task.map((t) => (t === editedTask ? updatedTask : t));

    dispatch(updateTask(updatedTask));
    setOpen2(false);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const handleChange = (event) => {
    setStage(event.target.value);
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = (taskId) => {
    // setTask((prevTasks) =>
    //   prevTasks.map((task) =>
    //     task.id === taskId ? { ...task, activeStep: task.activeStep + 1 } : task
    //   )
    // );
    dispatch(updateActiveStep({ id: taskId }));
  };

  const handleReset = (taskId) => {
    // setTasks((prevTasks) =>
    //   prevTasks.map((task) =>
    //     task.id === taskId ? { ...task, activeStep: 0 } : task
    //   )
    // );

    dispatch(resetActiveStep({ id: taskId }));
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleModalOpen = (isEditMode) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const navigate = useNavigate();

  const handleTaskManagement = () => {
    navigate("taskmanagement");
  };

  const steps = ["BACKLOG", "TO DO", "ONGOING", "DONE"];

  const isResponsive = window.innerWidth <= 960;

  // const handleOnDragEnd = (result) => {
  //   if (!result) {
  //     return;
  //   }
  // };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      // onDragStart={handleOnDragStart}
    >
      <div>
        <Navbar />
        {isConfirmationOpen && (
          <Dialog
            sx={{ borderRadius: "15px" }}
            open={isConfirmationOpen}
            onClose={handleCancelDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this task?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  backgroundColor: "#0eaf94",
                  color: "white",
                  borderRadius: "15px",
                  "&:hover": {
                    backgroundColor: "#0eaf94b0",
                  },
                }}
                onClick={handleCancelDelete}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                sx={{
                  backgroundColor: "#185a9d",
                  color: "white",
                  borderRadius: "15px",
                  "&:hover": {
                    backgroundColor: "#134272",
                  },
                }}
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Box sx={{ ml: isResponsive ? "0px" : "240px", mt: "20px" }}>
          <Container>
            <br />
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
            <br />
            <br />
            <br />
            <Box
              sx={{
                textAlign: "end",
                mt: "70px",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              {/* {task.length === 0 && (
                <h4 style={{ fontSize: "15px" }}>Start by adding a new task</h4>
              )} */}
              <button
                sx={{ mt: "70px" }}
                // className="task-management-button"
                type="submit"
                onClick={handleModalOpen}
              >
                Add task
              </button>
            </Box>
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
                  {stageError && (
                    <div className="error-message">{stageError}</div>
                  )}
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
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label={
                            <>
                              Date <span style={{ color: "red" }}>*</span>
                            </>
                          }
                          sx={{ width: "350px", marginBottom: "40px" }}
                          //   sx={{ width: "400px !important", marginBottom: "40px" }}
                          onChange={(newDate) => {
                            setDate(newDate);
                            console.log(newDate);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          value={date}
                        />
                      </DemoContainer>
                    </LocalizationProvider> */}
                  </FormControl>
                  {dateError && (
                    <div className="date-error-message">{dateError}</div>
                  )}
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
            {/* edit modal */}

            <Modal
              open={open2}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Task
                </Typography>
                <br />
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
                      <MenuItem value={2}>Done stage</MenuItem>
                    </Select>
                  </FormControl>
                  {stageError && (
                    <div className="error-message">{stageError}</div>
                  )}
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
                      <MenuItem value={0}>High</MenuItem>
                      <MenuItem value={1}>Medium</MenuItem>
                      <MenuItem value={2}>Low</MenuItem>
                    </Select>
                  </FormControl>
                  {priorityError && (
                    <div className="error-message">{priorityError}</div>
                  )}
                </Box>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label={
                            <>
                              Date <span style={{ color: "red" }}>*</span>
                            </>
                          }
                          sx={{ width: "350px", marginBottom: "40px" }}
                          //   sx={{ width: "400px !important", marginBottom: "40px" }}
                          onChange={(newDate) => {
                            setDate(newDate);
                            console.log(newDate);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          value={date}
                        />
                      </DemoContainer>
                    </LocalizationProvider> */}
                  </FormControl>
                  {dateError && (
                    <div className="date-error-message">{dateError}</div>
                  )}
                </Box>
                <br />
                <button onClick={editCard} type="submit">
                  Edit
                </button>
              </Box>
            </Modal>

            {/* edit modal end */}
            <Box sx={{ width: "100%" }}>
              <Container></Container>
              <div>
                {allStepsCompleted() ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={() => handleReset(task.id)}>
                        Reset
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </div>
            </Box>

            {/* <div>Put here</div> */}
            {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          > */}
            <Container>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // marginTop: "50px",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  padding: "0px 50px",
                  // flexWrap: "wrap",
                }}
              >
                {totalStages.map((stage, index) => {
                  return (
                    <Droppable
                      direction="horizontal"
                      droppableId={generateDroppableId(index)}
                    >
                      {(provided, snapshot) => {
                        return (
                          // <Box
                          //   sx={{
                          //     display: "flex",
                          //     flexDirection: "column",
                          //     alignItems: "center",
                          //     justifyContent: "center",
                          //   }}
                          // >
                          // <Grid
                          //   container
                          //   className="tasks__container"
                          //   spacing={5}
                          //   justifyContent="center"
                          // >
                          <TaskContainer
                            key={index}
                            stage={stage}
                            droppableProps={provided.droppableProps}
                            refProp={provided.innerRef}
                            droppableProvided={provided}
                            task={task}
                            // setTask={setTask}
                          />
                          // </Grid>
                          // </Box>
                        );
                      }}
                    </Droppable>
                  );
                })}

                {/* </Grid> */}
              </Box>
            </Container>
            {/* {task.length === 0 && (
              <h4 style={{ fontSize: "15px" }}>Start by adding a new task</h4>
            )} */}
            {/* <Tooltip title="Delete">
              <IconButton
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                  },
                }}
              >
                <DeleteIcon
                // ref={drop}
                // style={{
                //   cursor: "pointer",
                //   color: "grey",
                //   fontSize: "100px",
                //   position: "absolute",
                //   top: "50",
                //   // left: "5",
                //   right: "500",
                //   zIndex: "9999999999",
                // }}
                // onClick={(t) => handleDelete(t.id)}
                />
              </IconButton>
            </Tooltip> */}
            {/* {showDelete && ( */}
            <Box sx={{ textAlign: "center", marginTop: "200px" }}>
              {task.length === 0 && (
                <h3 style={{ fontSize: "20px" }}>Start by adding a new task</h3>
              )}
            </Box>
            <Droppable droppableId="delete-area">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  onClick={() => handleDeleteDrop(task.id)}
                >
                  {/* Render the delete icon here */}
                  <IconButton>
                    <DeleteIcon
                      sx={{
                        fontSize: "50px",
                        cursor: "pointer",
                        color: "grey",
                        // position: "absolute",
                        // top: "400px",
                        // left: "5",
                        // left: "500px",
                        right: "50px",
                        // zIndex: "9999999999",
                      }}
                    />
                  </IconButton>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* )} */}
            {/* <Box sx={{ textAlign: "end", marginRight: "37px", mt: "70px" }}>
              <button
                sx={{ mt: "70px" }}
                className="task-management-button"
                type="submit"
                onClick={handleModalOpen}
              >
                Add task
              </button> */}
            {/* {isDragging && (
                <Tooltip title="Delete">
                  <IconButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <DeleteIcon
                      ref={drop}
                      style={{
                        cursor: "pointer",
                        color: "grey",
                        fontSize: "100px",
                        position: "absolute",
                        top: "50",
                        // left: "5",
                        right: "500",
                        zIndex: "9999999999",
                      }}
                      // onClick={(t) => handleDelete(t.id)}
                    />
                  </IconButton>
                </Tooltip>
              )} */}
            {/* </Box> */}
            {/* </Box> */}
          </Container>
        </Box>
      </div>
    </DragDropContext>
  );
}

export default TaskManagement;
