import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderSalary({ salarys }) {
  console.log("salary: " + salarys);
  const ListSalary = salarys.salarys.map((salary) => {
    return (
      <Card
        key={salary.id}
        className="col-md-4 col-sm-6 col-12"
        style={{ padding: "15px 15px" }}
      >
        <CardTitle>{salary.name}</CardTitle>
        <ul style={{ padding: "0 15px" }}>
          <CardText>Mã Nhân Viên: {salary.id}</CardText>
          <CardText>Hệ Số Lương: {salary.salaryScale}</CardText>
          <CardText>Số Giờ Làm Thêm: {salary.overTime}</CardText>
          <div className="bg-secondary">
            <CardText>Lương: {salary.salary}</CardText>
          </div>
        </ul>
      </Card>
    );
  });
  return <div className="row">{ListSalary}</div>;
}

const Salary = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/nhan-vien">Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <div className="col-12">
          <h3>Bảng Lương</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderSalary salarys={props.salarys} />
      </div>
    </div>
  );
};

export default Salary;
