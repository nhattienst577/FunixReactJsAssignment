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

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const stafflist = this.props.staffnv.map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-5 m-1">
          <CardTitle>{staff.name}</CardTitle>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{stafflist}</div>
      </div>
    );
  }
}

export default StaffList;
