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

import Link from "@mui/material/Link";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

const steps = ["BACKLOG", "TO DO", "ONGOING", "DONE"];

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
  const [stage, setStage] = useState("");
  const [task, setTask] = useState([]);
  const [cards, setCards] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState([]);

  function handleClick(event) {
    event.preventDefault();
    navigate("/login/dashboard");
    // navigate to="/dashboard"
    console.info("You clicked a breadcrumb.");
  }

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
    <Link
      underline="hover"
      key="2"
      color="inherit"
      //   href="/material-ui/getting-started/installation/"
      //   onClick={handleClick}
    >
      Task management
    </Link>,
    // <Typography key="3" color="text.primary">
    //   Breadcrumb
    // </Typography>,
  ];

  const addCard = () => {
    // const newCard = { id: cards.length + 1, title: "New Card" };
    // setCards([...cards, newCard]);

    const newTask = {
      name: name,
      priority: priority,
      stage: stage,
    };

    setTask([...task, newTask]);
    console.log("hello", task);
    // setName("");
    // setPriority("");
    // setStage("");
    setOpen(false);
  };

  const editCard = () => {
    const updatedTask = {
      name: name,
      priority: priority,
      stage: stage,
    };

    const updatedTasks = task.map((t) =>
      t.id === editedTask.id ? updatedTask : t
    );
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

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // const handleModalOpen = () => {
  //   // setModal(true);
  //   // console.log("hello");
  //   setEditMode(false);
  //   setOpen(true);
  // };

  const handleModalOpen = (isEditMode) => {
    // setEditMode(isEditMode);
    // if (isEditMode) {
    //   console.log("true")
    //   setEditMode(true);
    // } else {
    //   setEditMode(false);
    //   console.log("true")
    // }
    setOpen(true);
    // setName("");
    // setPriority("");
    // setStage("");
    // setEditMode(isEditMode);
    // setOpen(true);
  };

  const handleModalOpen2 = (isEditMode) => {
    setOpen2(true);
    // setName("");
    // setPriority("");
    // setStage("");
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const navigate = useNavigate();

  const handleTaskManagement = () => {
    navigate("taskmanagement");
  };

  return (
    <div>
      <Navbar />
      <Box marginTop="20px">
        <Container>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <br />
          {/* <button onClick={handleModalOpen}>Add task</button> */}
          {/* <Card /> */}
          {/* <Modal
        modal={modal}
        setModal={setModal}
        handleModalOpen={handleModalOpen}
      /> */}
          {/* <button onClick={handleModalOpen}>Add task</button> */}
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
            <Container>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton
                      color="inherit"
                      onClick={handleStep(index)}
                      StepIconComponent={CustomStepIcon}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Container>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                    Step {activeStep + 1}
                  </Typography> */}

                  {task.map((t) => {
                    return (
                      <Container key={t.id}>
                        <Box mb={2}>
                          <Card>
                            <CardContent>
                              <Typography variant="h5" component="div">
                                {/* {editedTask && editedTask.map((t) => t.name)} */}
                                {t.name}
                                {t.priority === 0 && (
                                  <KeyboardDoubleArrowUpIcon
                                    style={{ color: "red" }}
                                  />
                                )}
                                {t.priority === 1 && (
                                  <KeyboardDoubleArrowRightIcon
                                    style={{ color: "yellow" }}
                                  />
                                )}
                                {t.priority === 2 && (
                                  <KeyboardDoubleArrowDownIcon
                                    style={{ color: "green" }}
                                  />
                                )}
                                <EditIcon
                                  onClick={handleModalOpen2}
                                  style={{ cursor: "pointer" }}
                                />

                                {/* {task.map((d) => (
                                  <div>
                                    <h4>{d.name}</h4>
                                    {d.priority === 0 && (
                                      <KeyboardDoubleArrowUpIcon
                                        style={{ color: "red" }}
                                      />
                                    )}
                                    {d.priority === 1 && (
                                      <KeyboardDoubleArrowRightIcon
                                        style={{ color: "yellow" }}
                                      />
                                    )}
                                    {d.priority === 2 && (
                                      <KeyboardDoubleArrowDownIcon
                                        style={{ color: "green" }}
                                      />
                                    )}
                                    <EditIcon
                                      onClick={() => setOpen(true)}
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                ))} */}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </Container>
                    );
                  })}

                  {/* 
                  {activeStep === 0 && (
                    <Card sx={{ width: "240px" }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {task.map((d) => (
                            <div>
                              <h4>{d.name}</h4>
                              {d.priority === 0 && (
                                <KeyboardDoubleArrowUpIcon
                                  style={{ color: "red" }}
                                />
                              )}
                              {d.priority === 1 && (
                                <KeyboardDoubleArrowRightIcon
                                  style={{ color: "yellow" }}
                                />
                              )}
                              {d.priority === 2 && (
                                <KeyboardDoubleArrowDownIcon
                                  style={{ color: "green" }}
                                />
                              )}
                              <EditIcon
                                onClick={() => setOpen(true)}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          ))}
                        </Typography>
                        <Typography
                          sx={{ mb: 1.5 }}
                          color="text.secondary"
                        ></Typography>
                        <Typography variant="body2">
                          <TimelapseIcon />
                        </Typography>
                      </CardContent>
                    </Card>
                  )}

                  {activeStep === 1 && (
                    <Card sx={{ width: "240px", marginLeft: "380px" }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                          be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          adjective
                        </Typography>
                        <Typography variant="body2">
                          well meaning and kindly.
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  )}

                  {activeStep === 2 && (
                    <Card sx={{ width: "240px", marginLeft: "780px" }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                          be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          adjective
                        </Typography>
                        <Typography variant="body2">
                          well meaning and kindly.
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  )}

                  {activeStep === 3 && (
                    <Card sx={{ width: "240px", marginLeft: "1080px" }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                          be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          adjective
                        </Typography>
                        <Typography variant="body2">
                          well meaning and kindly.
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  )} */}

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Prev
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Next
                    </Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? "Finish"
                            : "Complete Task"}
                        </Button>
                      ))}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
          <Box sx={{ textAlign: "end" }}>
            <button sx={{ mt: "70px" }} type="submit" onClick={handleModalOpen}>
              Add task
            </button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default TaskManagement;
