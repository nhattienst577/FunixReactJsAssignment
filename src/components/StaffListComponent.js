import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardImgOverlayProps,
  CardImgProps,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import dateFormat from "dateformat";
import { DEPARTMENTS } from "../shared/staffs";

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStaff: null,
    };
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardBody>
              <CardTitle>Họ và Tên: {staff.name}</CardTitle>
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
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const stafflist = this.props.staffnv.map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onStaffSelect(staff)}>
            <CardTitle>{staff.name}</CardTitle>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{stafflist}</div>
        <div>
          <p>Bấm vào tên nhân viên để xem thông tin</p>
        </div>
        <div className="row">{this.renderStaff(this.state.selectedStaff)}</div>
      </div>
    );
  }
}

export default StaffList;