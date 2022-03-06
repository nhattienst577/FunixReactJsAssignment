import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

function RenderDepartmentItem({ departments }) {
  const listDepartment = departments.departments.map((depart) => {
    return (
      <Card
        key={depart.id}
        className="col-md-4 col-sm-6 col-12"
        style={{ padding: "15px 15px" }}
      >
        <FadeTransform
          in
          transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
        >
          <Link to={`/phong-ban/${depart.id}`}>
            <CardTitle>{depart.name}</CardTitle>
            <ul>
              <CardText>Số lượng nhân viên: {depart.numberOfStaff}</CardText>
            </ul>
          </Link>
        </FadeTransform>
      </Card>
    );
  });
  return <div className="row">{listDepartment}</div>;
}

const Department = (props) => {
  if (props.departments.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.departments.errMess) {
    return (
      <div className="container">
        <div className="row">
          <p>{props.departments.errMess}</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="container">
        <div className="row">
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
