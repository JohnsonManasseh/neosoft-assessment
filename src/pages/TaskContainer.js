import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../components/Task";

import Typography from "@mui/material/Typography";
import { useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Grid } from "@mui/material";
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

function TaskContainer({
  task,
  setTask,
  droppableProps,
  refProp,
  stage,
  droppableProvided,
}) {
  //   const [task, setTask] = useState([]);
  const [editedTask, setEditedTask] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [droppedTask, setDroppedTask] = useState(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const steps = ["BACKLOG", "TO DO", "ONGOING", "DONE"];

  //   const handleBack = (taskId) => {
  //     setTask((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === taskId ? { ...task, activeStep: task.activeStep - 1 } : task
  //       )
  //     );
  //   };
  const dispatch = useDispatch();

  const handleDelete = (taskId) => {
    // setTask((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    dispatch(deleteTask(taskId));
  };

  const handleModalOpen2 = (taskToEdit) => {
    setEditedTask(taskToEdit);
    setOpen2(true);
  };

  //   const handleNext = (taskId) => {
  //     setTask((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === taskId ? { ...task, activeStep: task.activeStep + 1 } : task
  //       )
  //     );
  //   };

  const [activeStageIndex, setActiveStageIndex] = useState(stage.stage);
  const handleNext = (taskId) => {
    const taskToUpdate = task.find((t) => t.id === taskId);
    if (taskToUpdate) {
      const updatedStage =
        activeStageIndex < totalStages.length - 1
          ? activeStageIndex + 1
          : taskToUpdate.stage;

      const updatedActiveStep = taskToUpdate.activeStep + 1;

      // Update the Redux state using the action with name, stage, and activeStep
      dispatch(
        updateTask({
          id: taskId,
          name: taskToUpdate.name, // Pass the name along with stage and activeStep
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

      // Update the Redux state using the action with name, stage, and activeStep
      dispatch(
        updateTask({
          id: taskId,
          name: taskToUpdate.name, // Pass the name along with stage and activeStep
          priority: taskToUpdate.priority,
          stage: updatedStage,
          activeStep: updatedActiveStep,
        })
      );
    }
  };

  // const handleNext = (taskId) => {
  //   // setTask((prevTasks) =>
  //   //   prevTasks.map((t) =>
  //   //     t.id === taskId
  //   //       ? {
  //   //           ...t,
  //   //           stage:
  //   //             activeStageIndex < totalStages.length - 1
  //   //               ? activeStageIndex + 1
  //   //               : t.stage,
  //   //           activeStep: t.activeStep + 1,
  //   //         }
  //   //       : t
  //   //   )
  //   // );
  //   dispatch(
  //     updateTask({
  //       id: taskId,
  //       stage:
  //         activeStageIndex < totalStages.length - 1
  //           ? activeStageIndex + 1
  //           : stage.stage,
  //       activeStep: activeStep + 1,
  //     })
  //   );
  // };
  // const handleBack = (taskId) => {
  //   // setTask((prevTasks) =>
  //   //   prevTasks.map((t) =>
  //   //     t.id === taskId
  //   //       ? {
  //   //           ...t,
  //   //           stage: activeStageIndex > 0 ? activeStageIndex - 1 : t.stage,
  //   //           activeStep: t.activeStep - 1,
  //   //         }
  //   //       : t
  //   //   )
  //   // );
  //   dispatch(
  //     updateTask({
  //       id: taskId,
  //       stage: activeStageIndex > 0 ? activeStageIndex - 1 : stage.stage,
  //       activeStep: activeStep - 1,
  //     })
  //   );
  // };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "div",
      item: { taskId: task.length > 0 ? task[task.length - 1].id : null }, // Ensure taskId is set correctly
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task]
  );

  const handleDeleteDrop = useCallback(
    (taskId) => {
      setIsConfirmationOpen(true);
      setDroppedTask(task.find((task) => task.id === taskId));
    },
    [task]
  );

  const handleConfirmDelete = () => {
    if (droppedTask) {
      setTask((prevTasks) =>
        prevTasks.filter((task) => task.id !== droppedTask.id)
      );
      setIsConfirmationOpen(false);
      setDroppedTask(null); // Reset droppedTask state here
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false);
    setDroppedTask(null);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      console.log("Dropped Task ID:", item.taskId); // Log the dropped taskId to console
      setDroppedTask(task.find((task) => task.id === item.taskId));
      setIsConfirmationOpen(true);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const boxHeight =
    task.filter((filteredTask) => filteredTask.stage === stage.stage).length *
      210 +
    205; // Adjust the height based on your preference

  return (
    <Grid item xs={12} sm={6} md={3}>
      <div {...droppableProps} ref={refProp}>
        <Box
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
          {/* <Droppable droppableId="task-list" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}> */}
          {task
            .filter((filteredTask) => filteredTask.stage === stage.stage)
            .map((t, index) => (
              <Draggable key={t.id} draggableId={t.id.toString()} index={index}>
                {(provided) => (
                  <div
                  // ref={provided.innerRef}
                  // {...provided.draggableProps}
                  // {...provided.dragHandleProps}
                  >
                    <Task
                      t={t}
                      handleBack={handleBack}
                      handleDelete={handleDelete}
                      handleModalOpen2={handleModalOpen2}
                      handleNext={handleNext}
                      drag={drag}
                      steps={steps}
                      taskRefProp={provided.innerRef}
                      taskDraggableProp={provided.draggableProps}
                      taskDragHandleProp={provided.dragHandleProps}
                      // date={date}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          {droppableProvided.placeholder}
        </Box>
      </div>
    </Grid>
  );
}

export default TaskContainer;
