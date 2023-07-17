import React from "react";
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
function Task({
  task,
  handleBack,
  handleDelete,
  handleModalOpen2,
  handleNext,
  drag,
  steps,
  date,
}) {
  return (
    <div>
      {task.map((t) => {
        const isBackDisabled = t.activeStep === 0;

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
              <Box mb={2} sx={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}>
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
                          //   className=""
                          disabled={isBackDisabled}
                          //   disabled
                          onClick={() => handleBack(t.id)}
                        >
                          Back
                        </button>
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
                          <Tooltip
                            title={date ? date.format("YYYY-MM-DD") : ""}
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
    </div>
  );
}

export default Task;
