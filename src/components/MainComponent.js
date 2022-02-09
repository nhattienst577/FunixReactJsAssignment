import React, { Component } from "react";
import StaffList from "./StaffComponent";
import { STAFFS } from "../shared/staffs";
import StaffDetail from "./StaffDetailComponent";
import { DEPARTMENTS } from "../shared/staffs";

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
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default Main;
