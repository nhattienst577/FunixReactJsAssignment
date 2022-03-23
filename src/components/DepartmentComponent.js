import React, { Component } from "react";
import { Card, CardTitle, CardText } from "reactstrap";

//presentational component
class RenderDepartment extends Component {
  render() {
    return (
      //Render Department dung props cua Department Component
      <Card>
        <CardTitle>{this.props.department.name}</CardTitle>
        <ul>
          <CardText>
            Số lượng nhân viên: {this.props.department.numberOfStaff}
          </CardText>
        </ul>
      </Card>
    );
  }
}

//container component
class Department extends Component {
  render() {
    //Dung map() de fetch toan bo data tu props cua MainComponent
    const departments = this.props.departments.map((department) => {
      return (
        <div
          key={department.id}
          className="col-md-4 col-sm-6 col-12"
          style={{ padding: "15px 15px" }}
        >
          <RenderDepartment department={department} />
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{departments}</div>
      </div>
    );
  }
}

export default Department;
