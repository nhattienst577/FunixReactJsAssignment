import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

//staffs
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
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

//salry
// export const fetchSalary = () => (dispatch) => {
//   dispatch(salaryLoading(true));

//   return fetch(baseUrl + "staffsSalary")
//     .then((response) => response.json())
//     .then((salarys) => dispatch(addSalarys(salarys)));
// };

// export const salaryLoading = () => ({
//   type: ActionTypes.SALARY_LOADING,
// });

// export const salaryFailed = (errmess) => ({
//   type: ActionTypes.SALARY_FAILED,
//   payload: errmess,
// });

// export const addSalary = (salarys) => ({
//   type: ActionTypes.ADD_SALARY,
//   payload: salarys,
// });

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
