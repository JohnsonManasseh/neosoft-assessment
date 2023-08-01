import React, { useState } from "react";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StepLabel from "@mui/material/StepLabel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import { totalStages } from "../assets/constants/constants";
function Task({
  t,
  handleBack,
  handleDelete,
  handleModalOpen2,
  handleNext,
  drag,
  steps,
  date,
  taskRefProp,
  taskDraggableProp,
  taskDragHandleProp,
}) {
  const isBackDisabled = t.stage === 0; // Disable left arrow if it's the first stage
  const isNextDisabled = t.stage === 3;
  // const [activeStageIndex, setActiveStageIndex] = useState(0);

  // const handleNextCard = () => {
  //   if (activeStageIndex < totalStages.length - 1) {
  //     setActiveStageIndex((prevIndex) => prevIndex + 1);
  //   }
  //   console.log("hello johnson");
  // };

  return (
    <div {...taskDraggableProp} {...taskDragHandleProp} ref={taskRefProp}>
      {/* {task.map((t) => { */}
      {/* const isBackDisabled = t.activeStep === 0; return ( */}

      <div ref={drag} key={t.id}>
        <Container>
          <br />
          <Box
            mb={2}
            sx={{
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              width: "270px",
              borderRadius: "20px",
            }}
          >
            <Card
              sx={{
                backgroundColor: "aliceblue",
                borderRadius: "15px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
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
                    <br />
                    <br />
                    <br />

                    {/* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton>
                        <ArrowCircleLeftIcon
                          color="blue"
                          sx={{ height: "20px" }}
                        />
                      </IconButton>
                      <IconButton>
                        <ArrowCircleRightIcon
                          color="green"
                          sx={{ height: "20px" }}
                        />
                      </IconButton>
                    </Box> */}

                    {/* <IconButton>
                      <ArrowCircleLeftIcon color="blue" />
                    </IconButton>
                    <IconButton>
                      <ArrowCircleRightIcon />
                    </IconButton> */}
                    {/* <button
                      type="submit"
                      //   className=""
                      // disabled={isBackDisabled}
                      //   disabled
                      onClick={() => handleBack(t.id)}
                    >
                      Back
                    </button> */}
                  </Box>
                  <Box>
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
                              backgroundColor: "#0eaf9444",
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
                      <Tooltip title={date ? date.format("YYYY-MM-DD") : ""}>
                        <IconButton
                          sx={{
                            "&:hover": {
                              backgroundColor: "#0eaf9444",
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
                              backgroundColor: "#0eaf9444",
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
                    <Box
                      sx={{
                        textAlign: "center",
                        paddingTop: "24px",
                        width: "150px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          textAlign: "center",
                          paddingTop: "24px",
                          wordWrap: "break-word",
                        }}
                      >
                        {t.name}
                      </Typography>
                    </Box>
                    <br />
                    <br />
                    <br />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton>
                        <ArrowCircleLeftIcon
                          onClick={() => handleBack(t.id)}
                          disabled
                          sx={{
                            fontSize: "50px",
                            cursor: "pointer",
                            color: "#185a9d",
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <ArrowCircleRightIcon
                          onClick={() => handleNext(t.id)}
                          disabled={isNextDisabled}
                          sx={{
                            fontSize: "50px",
                            cursor: "pointer",
                            color: "#0eaf94",
                          }}
                        />
                      </IconButton>
                    </Box>
                    {/* <button
                      type="submit"
                      className="task-management-button"
                      disabled={t.activeStep === 3}
                      onClick={() => handleNext(t.id)}
                    >
                      Next
                    </button> */}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </div>
      {/* ); */}
      {/* })} */}
    </div>
  );
}

export default Task;
