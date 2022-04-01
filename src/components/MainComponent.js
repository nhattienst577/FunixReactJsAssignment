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
  addStaff,
  deleteStaff,
  updateStaff,
  fetchStaffs,
  fetchDepartments,
  fetchSalarys,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
  addStaff: (staff) => {
    dispatch(addStaff(staff));
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
  updateStaff: (staff) => {
    dispatch(updateStaff(staff));
  },
});

class Main extends Component {
  //khi mở ra là chạy ngay đầu tiên
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
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          onUpdateStaff={this.props.updateStaff}
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
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route
                exact
                path="/nhan-vien"
                component={() => (
                  <StaffList
                    staffs={this.props.staffs}
                    staffsLoading={this.props.staffs.isLoading}
                    staffsErrMess={this.props.staffs.errMess}
                    //hứng dữ liệu từ component con stafflist onAddStaff
                    onAddStaff={this.props.addStaff}
                    onDeleteStaff={this.props.deleteStaff}
                  />
                )}
              />
              <Route path="/nhan-vien/:staffId" component={StaffWithId} />
              <Route
                exact
                path="/phong-ban"
                component={() => (
                  <Department
                    departments={this.props.departments}
                    departmentsLoading={this.props.departments.isLoading}
                    departmentsErrMess={this.props.departments.errMess}
                  />
                )}
              />
              <Route
                path="/phong-ban/:departmentId"
                component={DepartmentWithId}
              />
              <Route
                exact
                path="/bang-luong"
                component={() => (
                  <Salary
                    salarys={this.props.salarys}
                    salarysLoading={this.props.salarys.isLoading}
                    salarysErrMess={this.props.salarys.errMess}
                  />
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
