import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffComponent";
import { STAFFS } from "../shared/staffs";
import StaffDetail from "./StaffDetailComponent";
import { DEPARTMENTS } from "../shared/staffs";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import { fetchStaffs } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
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

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/nhan-vien"
            component={() => (
              <StaffList
                staffs={this.state.staffs}
                updateState={(newStaffs) => this.updateState(newStaffs)}
              />
            )}
          />
          <Route path="/nhan-vien/:id" component={StaffWithId} />
          <Route
            exact
            path="/phong-ban"
            component={() => (
              <Department departments={this.state.departments} />
            )}
          />
          <Route
            exact
            path="/bang-luong"
            component={() => <Salary staffs={this.state.staffs} />}
          />
          <Redirect to="/nhan-vien" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
