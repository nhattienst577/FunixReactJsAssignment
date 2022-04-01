import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = {
    isLoading: true,
    errMess: null,
    staffs: [],
  },
  action
) => {
  switch (action.type) {
    //staff success
    case ActionTypes.STAFFS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };

    //staff loading
    case ActionTypes.STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };

    //staff failed
    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    //add staff
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        staffs: action.payload,
      };

    //update staff
    case ActionTypes.UPDATE_STAFFS:
      return {
        ...state,
        staffs: action.payload,
      };

    //delete staff

    case ActionTypes.DELETE_STAFFS:
      const filterStaffs = state.staffs.filter(
        (staff) => staff.id !== action.payload
      );
      return { ...state, isLoading: false, staffs: filterStaffs };

    default:
      return state;
  }
};
