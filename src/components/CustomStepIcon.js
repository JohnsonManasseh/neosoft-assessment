import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  stepIcon: {
    color: (props) => (props.active ? "white" : "inherit"),
    backgroundColor: (props) =>
      props.active ? "rgba(67, 206, 162, 1)" : "inherit",
    borderRadius: "50%",
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const CustomStepIcon = ({ active, completed, icon }) => {
  const classes = useStyles({ active });

  return (
    <div className={classes.stepIcon}>
      <span style={{ color: active ? "white" : "inherit" }}>{icon}</span>
    </div>
  );
};

export default CustomStepIcon;
