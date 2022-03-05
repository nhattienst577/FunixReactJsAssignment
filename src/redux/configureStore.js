import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./staff";
import { Departments } from "./departments";
import { Salarys } from "./salary";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      salarys: Salarys,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
