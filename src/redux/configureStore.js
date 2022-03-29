import { createStore, combineReducers, applyMiddleware } from "redux";

import { Staffs } from "./staff";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Departments } from "./departments";
import { Salarys } from "./salary";

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
