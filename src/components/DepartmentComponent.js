import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderDepartmentItem({ departments }) {
  const listDepartment = departments.departments.map((depart) => {
    return (
      <Card
        key={depart.id}
        className="col-md-4 col-sm-6 col-12"
        style={{ padding: "15px 15px" }}
      >
        <Link to={`/phong-ban/${depart.id}`}>
          <CardTitle>{depart.name}</CardTitle>
          <ul>
            <CardText>Số lượng nhân viên: {depart.numberOfStaff}</CardText>
          </ul>
        </Link>
      </Card>
    );
  });
  return <div className="row">{listDepartment}</div>;
}

const Department = (props) => {
  return (
    <div className="container">
      <div className="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/nhan-vien">Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Phòng Ban</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <div className="col-12">
          <h3>Phòng Ban</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDepartmentItem departments={props.departments} />
      </div>
    </div>
  );
};

export default Department;
