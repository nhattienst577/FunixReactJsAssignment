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
      selectedStaff: null,
      departments: DEPARTMENTS,
    };
  }

  onStaffSelect(staffId) {
    this.setState({ selectedStaff: staffId });
  }

  render() {
    return (
      <div>
        <StaffList
          staffs={this.state.staffs}
          onClick={(staffId) => this.onStaffSelect(staffId)}
        />
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === this.state.selectedStaff
            )[0]
          }
        />
      </div>
    );
  }
}

export default Main;
