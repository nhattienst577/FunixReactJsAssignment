import React from "react";
import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";
import dateFormat from "dateformat";

function RenderStaff({ staff }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-4">
          <CardImg src={staff.image} alt={staff.name} />
        </div>
        <div className="col-sm-8">
          <Card>
            <CardBody>
              <CardTitle>
                <h3>Họ và Tên: {staff.name}</h3>
              </CardTitle>
              <CardText>
                Ngày Sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày Vào Công Ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>Phòng Ban: {staff.department.name}</CardText>
              <CardText>Số Ngày Nghỉ Còn Lại: {staff.annualLeave}</CardText>
              <CardText>Số Ngày Đã Làm Thêm: {staff.overTime}</CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

const StaffDetail = (props) => {
  if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <RenderStaff staff={props.staff} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
