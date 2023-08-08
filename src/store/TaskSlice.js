import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  stageCounts: [0, 0, 0, 0],
  totalTasks: 0,
  pendingTasks: 0,
  completedTasks: 0,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.stageCounts = state.stageCounts.map((count, index) =>
        index === action.payload.stage ? count + 1 : count
      );
      state.totalTasks = state.tasks.length;
      state.pendingTasks = state.stageCounts
        .slice(0, 3)
        .reduce((acc, count) => acc + count, 0);
      state.completedTasks = state.stageCounts[3];
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.stageCounts = state.tasks.reduce(
        (acc, task) => {
          acc[task.stage]++;
          return acc;
        },
        [0, 0, 0, 0]
      );
      state.totalTasks = state.tasks.length;
      state.pendingTasks = state.stageCounts
        .slice(0, 3)
        .reduce((acc, count) => acc + count, 0);
      state.completedTasks = state.stageCounts[3];
    },

    updateTask: (state, action) => {
      const { id, name, priority, stage } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);

      if (index !== -1) {
        state.tasks = state.tasks.map((task) =>
          task.id === id ? { ...task, name, priority, stage } : task
        );
      }
    },
    updateActiveStep: (state, action) => {
      // Find the index of the task to be updated
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        // Update the activeStep of the task
        state.tasks[index] = {
          ...state.tasks[index],
          activeStep: state.tasks[index].activeStep + 1,
        };
      }
    },
    updateTaskStageAction: (state, action) => {
      const { id, newStage } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, stage: newStage } : task
      );
      state.stageCounts = state.tasks.reduce(
        (acc, task) => {
          acc[task.stage]++;
          return acc;
        },
        [0, 0, 0, 0]
      );
      state.pendingTasks = state.stageCounts
        .slice(0, 3)
        .reduce((acc, count) => acc + count, 0);
      state.completedTasks = state.stageCounts[3];
    },
    resetActiveStep: (state, action) => {
      // Find the index of the task to be reset
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        // Reset the activeStep of the task to 0
        state.tasks[index] = {
          ...state.tasks[index],
          activeStep: 0,
        };
      }
    },
    updateTaskStage: (state, action) => {
      // Find the index of the task to be updated
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        // Update the stage of the task
        state.tasks[index] = {
          ...state.tasks[index],
          stage: action.payload.newStage,
        };
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  updateActiveStep,
  resetActiveStep,
  updateTaskStage,
  updateTaskStageAction,
} = taskSlice.actions;

export default taskSlice.reducer;
