import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import Loading from "./LoadingComponent";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

function RenderStaff({ staff, departments }) {
  const staffDetail = departments.filter(
    (depart) => depart.id === staff.departmentId
  )[0].name;
  return (
    <FadeTransform
      in
      transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
    >
      <div className="container">
        <div className="row">
          <Card className="col-md-3 col-sm-4 col-12">
            <CardImg width="100%" src={staff.image} alt={staff.name} />
          </Card>
          <Card key={staff.id} className="col-md-9 col-sm-8 col-12">
            <Stagger in>
              <CardBody>
                <CardTitle>Họ và Tên: {staff.name}</CardTitle>
                <Fade in>
                  <CardText>
                    Ngày Sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
                  </CardText>
                  <CardText>
                    Ngày Vào Công Ty:{" "}
                    {dateFormat(staff.startDate, "dd/mm/yyyy")}
                  </CardText>
                  <CardText>Phòng Ban: {staffDetail}</CardText>
                  <CardText>Số Ngày Nghỉ Còn Lại: {staff.annualLeave}</CardText>
                  <CardText>Số Ngày Đã Làm Thêm: {staff.overTime}</CardText>
                </Fade>
              </CardBody>
            </Stagger>
          </Card>
        </div>
      </div>
    </FadeTransform>
  );
}

const StaffDetail = (props) => {
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
              <Link to="/nhan-vien">Nhân Viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Nhân Viên</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderStaff staff={props.staff} departments={props.departments} />
        </div>
      </div>
    );
};

export default StaffDetail;
