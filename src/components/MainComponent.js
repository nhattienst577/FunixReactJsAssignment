import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffComponent";
import { STAFFS } from "../shared/staffs";
import StaffDetail from "./StaffDetailComponent";
import { DEPARTMENTS } from "../shared/staffs";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/nhanvien"
            component={() => <StaffList staffs={this.state.staffs} />}
          />
          <Redirect to="/nhanvien" />
        </Switch>
      </div>
    );
  }
}

export default Main;
