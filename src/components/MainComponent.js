import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffComponent";
import StaffDetail from "./StaffDetailComponent";
import Department from "./DepartmentComponent";
import DepartmentDetail from "./DepartmentDetailComponent";
import Salary from "./SalaryComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchStaffs,
  fetchDepartments,
  fetchSalarys,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salarys: state.salarys,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchSalarys: () => {
    dispatch(fetchSalarys());
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalarys();
  }
  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          departments={this.props.departments.departments}
        />
      );
    };

    const DepartmentWithId = ({ match }) => {
      return (
        <DepartmentDetail
          department={this.props.departments.departments.filter(
            (department) =>
              department.id === parseInt(match.params.departmentId, 10)
          )}
          staffs={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId === match.params.departmentId
          )}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/nhan-vien"
            component={() => <StaffList staffs={this.props.staffs} />}
          />
          <Route path="/nhan-vien/:staffId" component={StaffWithId} />
          <Route
            exact
            path="/phong-ban"
            component={() => (
              <Department departments={this.props.departments} />
            )}
          />
          <Route path="/phong-ban/:departmentId" component={DepartmentWithId} />
          <Route
            exact
            path="/bang-luong"
            component={() => <Salary salarys={this.props.salarys} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
