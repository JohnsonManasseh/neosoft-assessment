import React, { useState } from "react";
// import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const tomorrow = dayjs().add(1, "day");

function Modal({ modal, setModal, handleModalOpen }) {
  //   const [value, setValue] = useState(dayjs("2022-04-17"));

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={handleModalOpen}
      >
        Add Task
      </button>

      {modal && (
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1"> Name of the task</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="username/email"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <label for="exampleInputEmail1"> Stage of the task</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select Stage</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label for="exampleInputEmail1"> Priority</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select priority</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    label="Deadline"
                    value={deadline}
                    // onChange={(date) => {
                    //   handleDeadline(date);
                    // }}
                    // renderInput={(params) => (
                    //   <TextField
                    //     {...params}
                    //     size="small"
                    //     fullWidth
                    //     required
                    //     error={error?.deadline}
                    //     helperText={error?.deadline}
                    //   />
                    // )}
                  />
                </LocalizationProvider> */}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
