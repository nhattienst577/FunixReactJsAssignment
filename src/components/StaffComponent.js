import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderStaffItem({ staffs }) {
  const List = staffs.staffs.map((staff) => {
    return (
      <Card key={staff.id} className="border col-6 col-md-4 col-lg-2">
        <Link to={`/nhan-vien/${staff.id}`}>
          <CardImg width="100%" src={staff.image} alt={staff.name} />
          <CardTitle>{staff.name}</CardTitle>
        </Link>
      </Card>
    );
  });

  return <div className="row">{List}</div>;
}

class StaffList extends Component {
  render() {
    return (
      <div className="container">
        <div className="breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/nhan-vien">App</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Nhân Viên</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>Nhân Viên</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderStaffItem staffs={this.props.staffs} />
        </div>
      </div>
    );
  }
}

export default StaffList;
