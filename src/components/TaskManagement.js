import React from "react";
// import Modal from "./Modal";
import { useState } from "react";
// import Card from "./Card";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { TextField, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import EditIcon from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";
import Navbar from "./Navbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import StepLabel from "@mui/material/StepLabel";
import { useDrag, useDrop } from "react-dnd";
import { useCallback } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const CustomStepIcon = ({ active, completed, icon }) => {
  return (
    <Box
      sx={{
        color: completed ? "rgba(67, 206, 162, 1)" : "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: "50%",
        bgcolor: active ? "rgba(67, 206, 162, 1)" : "transparent",
      }}
    >
      {icon}
    </Box>
  );
};

// const steps = ["BACKLOG", "TO DO", "ONGOING", "DONE"];

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

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
  const [stage, setStage] = useState("");
  const [task, setTask] = useState([]);
  const [cards, setCards] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState([]);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", activeStep: 0 },
    { id: 2, name: "Task 2", activeStep: 0 },
  ]);

  // const [showDateTooltip, setShowDateTooltip] = useState(false);

  // const handleDateHover = () => {
  //   setShowDateTooltip(true);
  // };

  // const handleDateHoverEnd = () => {
  //   setShowDateTooltip(false);
  // };

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

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "div",
      item: { taskId: task.length > 0 ? task[task.length - 1].id : null },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task]
  );

  const handleDeleteDrop = useCallback((taskId) => {
    setTask((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      handleDeleteDrop(item.taskId);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

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
    const newTask = {
      id: Math.random(),
      name: name,
      priority: priority,
      stage: stage,
      date: date,
      activeStep: 0,
    };

    setTask([...task, newTask]);
    console.log("hello", task);
    setName("");
    setPriority("");
    setStage("");
    // setDate("");
    setOpen(false);
  };

  const editCard = () => {
    const updatedTask = {
      id: Math.random(),
      name: name,
      priority: priority,
      stage: stage,
    };

    const updatedTasks = task.map((t) => (t === editedTask ? updatedTask : t));

    setTask(updatedTasks);
    setOpen2(false);
  };

  const handleAddTask = () => {
    const task = {
      name: name,
      priority: priority,
      stage: stage,
    };

    setTask((prevTasks) => [...prevTasks, task]);
    console.log("hello", task);
    setName("");
    setPriority("");
    // setDate("");
    setStage("");
    setOpen(false);
  };
  //   console.log("task.name", task.name);

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

  // const handleNext = () => {
  //   const updatedTasks = task.map((t, index) => {
  //     if (index === activeStep) {
  //       return { ...t, stage: t.stage + 1 };
  //     }
  //     return t;
  //   });
  //   setTask(updatedTasks);
  // };

  const handleNext = (taskId) => {
    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, activeStep: task.activeStep + 1 } : task
      )
    );
  };

  const handleBack = (taskId) => {
    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, activeStep: task.activeStep - 1 } : task
      )
    );
  };

  const handleReset = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, activeStep: 0 } : task
      )
    );
  };

  // const handleBack = () => {
  //   const updatedTasks = task.map((t, index) => {
  //     if (index === activeStep) {
  //       return { ...t, stage: t.stage - 1 };
  //     }
  //     return t;
  //   });
  //   setTask(updatedTasks);
  // };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  //   const navigate = useNavigate();

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleModalOpen = (isEditMode) => {
    setOpen(true);
  };

  const handleModalOpen2 = (taskToEdit) => {
    setEditedTask(taskToEdit);
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const navigate = useNavigate();

  const handleTaskManagement = () => {
    navigate("taskmanagement");
  };

  const handleDelete = (taskId) => {
    setTask((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const steps = ["BACKLOG", "TO DO", "ONGOING", "DONE"];

  return (
    <div>
      <Navbar />
      <Box marginTop="20px">
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
              </Box>
              <Box sx={{ minWidth: "120px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label={
                        <>
                          Date <span style={{ color: "red" }}>*</span>
                        </>
                      }
                      sx={{ width: "350px", marginBottom: "40px" }}
                      onChange={(newDate) => {
                        setDate(newDate);
                        console.log(newDate);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      value={date}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>

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
              </Box>

              {/* <LocalizationProvider>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Basic date picker" />
            </DemoContainer>
          </LocalizationProvider> */}
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
                    <Button onClick={() => handleReset(task.id)}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {task.map((t) => {
                    return (
                      <div ref={drag} key={t.id}>
                        <Container>
                          <div>
                            <Box key={t.id}>
                              <Stepper activeStep={t.activeStep}>
                                {steps.map((label, index) => (
                                  <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                  </Step>
                                ))}
                              </Stepper>
                            </Box>
                          </div>
                          <br />
                          <Box
                            mb={2}
                            sx={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
                          >
                            <Card>
                              <CardContent>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <Typography variant="h5" component="div">
                                      {t.name}
                                    </Typography>
                                    <br />
                                    <br />
                                    <br />
                                    <button
                                      type="submit"
                                      // className="task-management-button"
                                      disabled={t.activeStep === 0}
                                      onClick={() => handleBack(t.id)}
                                    >
                                      Back
                                    </button>
                                  </Box>
                                  <Box>
                                    {/* <h4>
                                    {activeStep === 0 && "Backlog"}
                                    {activeStep === 1 && "To Do"}
                                    {activeStep === 2 && "Ongoing"}
                                    {activeStep === 3 && "Done"}
                                  </h4> */}
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <Tooltip title="Delete">
                                        <IconButton
                                          sx={{
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(255, 0, 0, 0.1)",
                                            },
                                          }}
                                        >
                                          <DeleteIcon
                                            style={{
                                              cursor: "pointer",
                                              color: "red",
                                            }}
                                            onClick={() => handleDelete(t.id)}
                                          />
                                        </IconButton>

                                        {/* <CalendarMonthIcon /> */}
                                      </Tooltip>
                                      <Tooltip
                                        title={
                                          date ? date.format("YYYY-MM-DD") : ""
                                        }
                                      >
                                        <IconButton
                                          sx={{
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(255, 0, 0, 0.1)",
                                            },
                                          }}
                                        >
                                          <CalendarMonthIcon
                                            style={{
                                              cursor: "pointer",
                                              color: "blue",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Edit">
                                        <IconButton
                                          sx={{
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(255, 0, 0, 0.1)",
                                            },
                                          }}
                                        >
                                          <EditIcon
                                            onClick={() => handleModalOpen2(t)}
                                            style={{
                                              cursor: "pointer",
                                              color: "green",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                    <br />
                                    <br />
                                    <br />
                                    <button
                                      type="submit"
                                      className="task-management-button"
                                      disabled={t.activeStep === 3}
                                      onClick={() => handleNext(t.id)}
                                    >
                                      Next
                                    </button>
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          </Box>
                        </Container>
                      </div>
                    );
                  })}

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
          <Box sx={{ textAlign: "end", marginRight: "37px" }}>
            <button
              sx={{ mt: "70px" }}
              className="task-management-button"
              type="submit"
              onClick={handleModalOpen}
            >
              Add task
            </button>
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
                    color: "red",
                  }}
                  // onClick={(t) => handleDelete(t.id)}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default TaskManagement;
