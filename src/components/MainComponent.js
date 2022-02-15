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
import Search from "./SearchComponent";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
      textSearch: "",
    };
  }

  // lấy dữ liệu nhập từ form search
  getTextSearch = (text) => {
    this.setState({
      textSearch: text,
    });
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

    //duyệt qua từng nv nếu name trùng với textSearch nhập vào thì push ra kq
    var results = [];
    this.state.staffs.forEach((item) => {
      if (item.name.indexOf(this.state.textSearch) !== -1) {
        results.push(item);
      }
    });
    console.log(results);

    return (
      <div>
        <Header />
        <Search checkSearch={(text) => this.getTextSearch(text)} />
        <Switch>
          <Route
            exact
            path="/nhan-vien"
            component={() => <StaffList staffs={results} />}
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
            component={() => <Salary staffs={results} />}
          />
          <Redirect to="/nhan-vien" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
