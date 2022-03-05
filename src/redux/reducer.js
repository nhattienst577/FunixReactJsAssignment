import { STAFFS, DEPARTMENTS } from "../shared/staffs";

export const initialState = {
    staffs: STAFFS,
    departments: DEPARTMENTS,
};

const Reducer = (state = initialState, action) => {
    return state;
};

export default Reducer;