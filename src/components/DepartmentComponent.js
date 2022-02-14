import React, { Component } from "react";
import { Card, CardTitle, CardText } from "reactstrap";

class Department extends Component {
  render() {
    const department = this.props.departments.map((item) => {
      return (
        <div
          key={item.id}
          className="col-md-4 col-sm-6 col-12"
          style={{ padding: "15px 15px" }}
        >
          <Card>
            <CardTitle>{item.name}</CardTitle>
            <ul>
              <CardText>Số lượng nhân viên: {item.numberOfStaff}</CardText>
            </ul>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{department}</div>
      </div>
    );
  }
}

export default Department;
