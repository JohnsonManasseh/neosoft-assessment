// import React from "react";
// // import Modal from "./Modal";
// import { useState } from "react";
// // import Card from "./Card";
// import Step from "@mui/material/Step";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// // import Step from "@mui/material/Step";
// import StepButton from "@mui/material/StepButton";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// // import Card from "@mui/material/Card";
// import { useNavigate } from "react-router-dom";
// import { Modal } from "@mui/material";
// import { TextField, Grid } from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
// import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// import TimelapseIcon from "@mui/icons-material/Timelapse";
// import EditIcon from "@mui/icons-material/Edit";
// import Container from "@mui/material/Container";
// import Navbar from "./Navbar";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import Link from "@mui/material/Link";
// import StepLabel from "@mui/material/StepLabel";
// import { useDrag, useDrop } from "react-dnd";
// import { useCallback } from "react";

// function Card({ task, handleDelete }) {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "div",
//     item: { taskId: task.id },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));
//   return (
//     <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
//       <Container>
//         <div>
//           <Box key={t.id}>
//             <Stepper activeStep={t.activeStep}>
//               {steps.map((label, index) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           </Box>
//         </div>
//         <br />
//         <Box mb={2} sx={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}>
//           <Card>
//             <CardContent>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Typography variant="h5" component="div">
//                     {t.name}
//                   </Typography>
//                   <br />
//                   <br />
//                   <br />
//                   <button
//                     type="submit"
//                     // className="task-management-button"
//                     disabled={t.activeStep === 0}
//                     onClick={() => handleBack(t.id)}
//                   >
//                     Back
//                   </button>
//                 </Box>
//                 <Box>
//                   {/* <h4>
//                                     {activeStep === 0 && "Backlog"}
//                                     {activeStep === 1 && "To Do"}
//                                     {activeStep === 2 && "Ongoing"}
//                                     {activeStep === 3 && "Done"}
//                                   </h4> */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "flex-end",
//                     }}
//                   >
//                     <Tooltip title="Delete">
//                       <IconButton
//                         sx={{
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 0, 0, 0.1)",
//                           },
//                         }}
//                       >
//                         <DeleteIcon
//                           style={{
//                             cursor: "pointer",
//                             color: "red",
//                           }}
//                           onClick={() => handleDelete(t.id)}
//                         />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Edit">
//                       <IconButton
//                         sx={{
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 0, 0, 0.1)",
//                           },
//                         }}
//                       >
//                         <EditIcon
//                           onClick={() => handleModalOpen2(t)}
//                           style={{
//                             cursor: "pointer",
//                             color: "green",
//                           }}
//                         />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                   <br />
//                   <br />
//                   <br />
//                   <button
//                     type="submit"
//                     className="task-management-button"
//                     disabled={t.activeStep === 3}
//                     onClick={() => handleNext(t.id)}
//                   >
//                     Next
//                   </button>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default Card;
