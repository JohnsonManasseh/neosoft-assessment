import React, { useState } from "react";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FlagIcon from "@mui/icons-material/Flag";
import { styled } from "@mui/material";

function Task({
  t,
  handleBack,
  handleDelete,
  handleModalOpen2,
  handleNext,
  steps,
  date,
  taskRefProp,
  taskDraggableProp,
  taskDragHandleProp,
  priority,
}) {
  const isBackDisabled = t.stage === 0;
  const isNextDisabled = t.stage === 3;

  const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.shadows[1],
  }));

  return (
    <div {...taskDraggableProp} {...taskDragHandleProp} ref={taskRefProp}>
      <div key={t.id}>
        {/* <StyledCard> */}
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
            <StyledCard
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
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Tooltip title={t.priority} placement="top">
                        <IconButton
                          sx={{
                            "&:hover": {
                              backgroundColor: "#0eaf9444",
                            },
                          }}
                        >
                          <FlagIcon
                            style={{
                              cursor: "pointer",
                              color:
                                t.priority === "high"
                                  ? "red"
                                  : t.priority === "medium"
                                  ? "orange"
                                  : t.priority === "low"
                                  ? "green"
                                  : "black",
                            }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        title={date ? date.format("YYYY-MM-DD") : ""}
                        placement="top"
                      >
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
                      <Tooltip title="Edit" placement="top">
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
                      <Tooltip title="Delete" placement="top">
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
                      <IconButton disabled={isBackDisabled}>
                        <ArrowCircleLeftIcon
                          onClick={() => handleBack(t.id)}
                          sx={{
                            fontSize: "50px",
                            cursor: "pointer",
                            color: "#185a9d",
                            color: isBackDisabled ? "grey" : "#185a9d",
                          }}
                        />
                      </IconButton>
                      <IconButton disabled={isNextDisabled}>
                        <ArrowCircleRightIcon
                          onClick={() => handleNext(t.id)}
                          sx={{
                            fontSize: "50px",
                            cursor: "pointer",
                            // color: "#0eaf94",
                            color: isNextDisabled ? "grey" : "#0eaf94",
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
            </StyledCard>
          </Box>
        </Container>
        {/* </StyledCard> */}
      </div>
    </div>
  );
}

export default Task;
