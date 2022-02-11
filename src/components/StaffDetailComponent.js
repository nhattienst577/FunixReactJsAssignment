import React from "react";
import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";
import dateFormat from "dateformat";

function RenderStaff({ staff }) {
  if (staff != null) {
    return (
      <Card className="col-md-3 col-sm-4 col-12">
        <CardImg width="100%" src={staff.image} alt={staff.name} />
      </Card>
    );
  } else {
    return <div></div>;
  }
}

function RenderProfile({ profile }) {
  if (profile != null) {
    return (
      <Card className="col-md-9 col-sm-8 col-12">
        {profile.map((staffs) => {
          return (
            <CardBody>
              <CardTitle>Họ và Tên: {staffs.name}</CardTitle>
              <CardText>
                Ngày Sinh: {dateFormat(staffs.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày Vào Công Ty: {dateFormat(staffs.startDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>Phòng Ban: {staffs.department.name}</CardText>
              <CardText>Số Ngày Nghỉ Còn Lại: {staffs.annualLeave}</CardText>
              <CardText>Số Ngày Đã Làm Thêm: {staffs.overTime}</CardText>
            </CardBody>
          );
        })}
      </Card>
    );
  } else {
    return <div></div>;
  }
}

const StaffDetail = (props) => {
  if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Nhân Viên</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderStaff staff={props.staff} />
          <RenderProfile profile={props.profile} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
