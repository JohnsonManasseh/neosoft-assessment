import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../components/Task";
import Typography from "@mui/material/Typography";
import { Card, Grid, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  updateTask,
  updateActiveStep,
  resetActiveStep,
  updateTaskStage,
} from "../store/TaskSlice";
import { totalStages } from "../assets/constants/constants";
// import { updateTask } from "../store/TaskSlice";

function TaskContainer({
  task,
  setTask,
  setOpen2,
  droppableProps,
  refProp,
  stage,
  droppableProvided,
  setTaskToEdit,
  setName,
  setPriority,
  setStage,
  setDate,
}) {
  const steps = ["BACKLOG", "TO DO", "ONGOING", "DONE"];

  const dispatch = useDispatch();

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleModalOpen2 = (taskToEdit) => {
    setName(taskToEdit.name); // Set the name state to the task's name
    setPriority(taskToEdit.priority);
    setStage(taskToEdit.stage);
    setDate(taskToEdit.date);
    // const updatedTask = { ...taskToEdit /* updated properties */ };
    setTaskToEdit(taskToEdit);
    // dispatch(updateTask(updatedTask));
    setOpen2(true);
    console.log("EditIcon clicked");
  };

  const [activeStageIndex, setActiveStageIndex] = useState(stage.stage);
  const handleNext = (taskId) => {
    const taskToUpdate = task.find((t) => t.id === taskId);
    if (taskToUpdate) {
      const updatedStage =
        activeStageIndex < totalStages.length - 1
          ? activeStageIndex + 1
          : taskToUpdate.stage;

      const updatedActiveStep = taskToUpdate.activeStep + 1;

      dispatch(
        updateTask({
          id: taskId,
          name: taskToUpdate.name,
          priority: taskToUpdate.priority,
          stage: updatedStage,
          activeStep: updatedActiveStep,
        })
      );
    }
  };

  const handleBack = (taskId) => {
    const taskToUpdate = task.find((t) => t.id === taskId);
    if (taskToUpdate) {
      const updatedStage =
        activeStageIndex > 0 ? activeStageIndex - 1 : taskToUpdate.stage;

      const updatedActiveStep = taskToUpdate.activeStep - 1;

      dispatch(
        updateTask({
          id: taskId,
          name: taskToUpdate.name,
          priority: taskToUpdate.priority,
          stage: updatedStage,
          activeStep: updatedActiveStep,
        })
      );
    }
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.shadows[3],
  }));

  return (
    <Grid item xs={12} sm={6} md={3}>
      <div {...droppableProps} ref={refProp}>
        <StyledCard
          sx={{
            width: "300px",
            // height: `${boxHeight}px`,
            height: "350%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            // margin: "20px",
            // background: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "50px",
            marginTop: "50px",
          }}
        >
          <Typography variant="h5" component="div" sx={{ padding: "20px 0px" }}>
            {stage.name}
          </Typography>
          {/* getting the tasks mapped */}
          {task
            .filter((filteredTask) => filteredTask.stage === stage.stage)
            .map((t, index) => (
              <Draggable key={t.id} draggableId={t.id.toString()} index={index}>
                {(provided) => (
                  <div data-task-id={t.id}>
                    <Task
                      t={t}
                      handleBack={handleBack}
                      handleDelete={handleDelete}
                      handleModalOpen2={handleModalOpen2}
                      handleNext={handleNext}
                      // drag={drag}
                      steps={steps}
                      taskRefProp={provided.innerRef}
                      taskDraggableProp={provided.draggableProps}
                      taskDragHandleProp={provided.dragHandleProps}
                      date={t.date}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          {droppableProvided.placeholder}
        </StyledCard>
      </div>
    </Grid>
  );
}

export default TaskContainer;
