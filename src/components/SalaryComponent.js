import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
const basicSalary = 3000000;
const overTimeSalary = 200000;

class Salary extends Component {
  render() {
    const paysalary = this.props.staffs.map((salary) => {
      return (
        <div
          key={salary.id}
          className="col-md-4 col-sm-6 col-12"
          style={{ padding: "15px 15px" }}
        >
          <Card>
            <CardTitle>{salary.name}</CardTitle>
            <ul style={{ padding: "0 15px" }}>
              <CardText>Mã Nhân Viên: {salary.id}</CardText>
              <CardText>Hệ Số Lương: {salary.salaryScale}</CardText>
              <CardText>Số Giờ Làm Thêm: {salary.overTime}</CardText>

              <div className="bg-secondary">
                <CardText className="salary">
                  Lương: {basicSalary + salary.overTime * overTimeSalary}
                </CardText>
              </div>
            </ul>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/nhan-vien">Nhân Viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Bảng Lương</h3>
            <hr />
          </div>
        </div>
        <div className="row">{paysalary}</div>
      </div>
    );
  }
}

export default Salary;
