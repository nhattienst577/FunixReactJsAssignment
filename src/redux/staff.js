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

    //delete staff

    default:
      return state;
  }
};
