import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffComponent";
import { STAFFS } from "../shared/staffs";
import StaffDetail from "./StaffDetailComponent";
import { DEPARTMENTS } from "../shared/staffs";
import { Switch, Route, Redirect } from "react-router-dom";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
    this.addStaff = this.addStaff.bind(this);
  }

  //nhận dữ liệu từ components con 1 parameters
  addStaff = (staff) => {
    //tạo 1 id ngẫu nhiên
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    //sau đó setState lại mảng copy lại staff ban đầu và đưa thêm newStaff vào
    this.setState({
      staffs: [...this.state.staffs, newStaff],
    });
    console.log("this is : " + newStaff);
    console.log(this.state.staffs);
  };

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0]
          }
          profile={this.state.staffs.filter(
            (info) => info.id === parseInt(match.params.id, 10)
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
            component={() => (
              <StaffList onAdd={this.addStaff} staffs={this.state.staffs} />
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

export default Main;
