import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

//staffs
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs") //call api
    .then((response) => response.json())
    .then((staffs) => dispatch(staffsSuccess(staffs)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const staffsSuccess = (staffs) => ({
  type: ActionTypes.STAFFS_SUCCESS,
  payload: staffs,
});

//departments
export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));

  return fetch(baseUrl + "departments")
    .then((response) => response.json())
    .then((departments) => dispatch(addDepartments(departments)));
};

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const fetchSalarys = () => (dispatch) => {
  dispatch(salarysLoading(true));

  return fetch(baseUrl + "staffsSalary")
    .then((response) => response.json())
    .then((salarys) => dispatch(addSalarys(salarys)));
};

export const salarysLoading = () => ({
  type: ActionTypes.SALARYS_LOADING,
});

export const salarysFailed = (errmess) => ({
  type: ActionTypes.SALARYS_FAILED,
  payload: errmess,
});

export const addSalarys = (salarys) => ({
  type: ActionTypes.ADD_SALARYS,
  payload: salarys,
});

//add staffs
//staff
export const addStaffSuccess = (staff) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staff, //nhận thông tin nhân viên sau khi người dùng đã post lên
});

export const addStaff = (staff) => (dispatch) => {
  //nhập du liệu
  return (
    fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(staff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      //kiểm lỗi
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(addStaffSuccess(response)))
      .catch((error) => {
        console.log("Post staffs", error.message);
        alert("Your staff could not be posted\nError: " + error.message);
      })
  );
};

//update staffs
export const updateStaffSuccess = (staff) => ({
  type: ActionTypes.UPDATE_STAFFS,
  payload: staff,
});

export const updateStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(staff),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(updateStaffSuccess(response)))
    .catch((error) => {
      console.log("Updated staffs", error.message);
      alert("Your staff could not be updated\nError: " + error.message);
    });
};

//delete staffs
export const deleteStaffSuccess = (id) => ({
  type: ActionTypes.DELETE_STAFFS,
  payload: id,
});

export const deleteStaff = (id) => (dispatch) => {
  if (window.confirm("Are you sure to delete this staff?")) {
    return fetch(baseUrl + `staffs/${id}`, {
      method: "DELETE",
    }).then(() => dispatch(deleteStaffSuccess(id)));
  } else return;
};
