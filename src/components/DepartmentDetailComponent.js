import React from "react";
import {
  Card,
  CardTitle,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

function RenderDepartment({ staffs }) {
  const List = staffs.map((staff) => {
    return (
      <Card key={staff.id} className="border col-6 col-md-4 col-lg-2">
        <FadeTransform
          in
          transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
        >
          <Link to={`/nhan-vien/${staff.id}`}>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardTitle>{staff.name}</CardTitle>
          </Link>
        </FadeTransform>
      </Card>
    );
  });

  return <div className="row justify-content-center card-body">{List}</div>;
}

const DepartmentDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <p>{props.errMess}</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/phong-ban">Phòng Ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <RenderDepartment staffs={props.staffs} />
        </div>
      </div>
    );
};

export default DepartmentDetail;
