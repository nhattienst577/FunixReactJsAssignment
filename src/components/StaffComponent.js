import React from "react";
import { Card, CardImg, CardTitle } from "reactstrap";

function RenderStaffItem({ staff }) {
  return (
    <Card className="App">
      <CardImg width="100%" src={staff.image} alt={staff.name} />
      <CardTitle>{staff.name}</CardTitle>
    </Card>
  );
}

const StaffList = (props) => {
  const stafflist = props.staffs.map((staff) => {
    return (
      <div className="col-lg-2 col-sm-6 col-md-4" key={staff.id}>
        <RenderStaffItem staff={staff} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Nhan Vien</h3>
          <hr />
        </div>
      </div>
      <div className="row">{stafflist}</div>
    </div>
  );
};

export default StaffList;
