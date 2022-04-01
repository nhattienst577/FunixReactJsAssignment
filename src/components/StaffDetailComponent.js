import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Label,
  Button,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import Loading from "./LoadingComponent";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

function RenderStaff({ staff, departments }) {
  // const staffDetail = departments.filter(
  //   (depart) => depart.id === staff.departmentId
  // )[0].name;
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
                  <CardText>Phòng Ban: {departments.name}</CardText>
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

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: true,
    };
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <p>{this.props.errMess}</p>
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
              <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>Nhân Viên</h3>
              {/* <Button color="success">Update</Button> */}
              <Button
                color="success"
                onClick={() => this.setState({ select: !this.state.select })}
              >
                Update
              </Button>
              <hr />
            </div>
          </div>
          {/* <div className="row">
            <RenderStaff
              staff={this.props.staff}
              departments={this.props.departments}
            />
          </div> */}
          {this.state.select ? (
            <FadeTransform
              in
              transformProps={{
                exitTransform: "scale(0.5) translateY(-50%)",
              }}
            >
              <div className="row mb-3">
                <RenderStaff
                  staff={this.props.staff}
                  departments={
                    this.props.departments.filter(
                      (dp) => dp.id === this.props.staff.departmentId
                    )[0]
                  }
                />
              </div>
            </FadeTransform>
          ) : (
            <div className="row mb-3">
              <FadeTransform
                in
                transformProps={{
                  exitTransform: "scale(0.5) translateY(-50%)",
                }}
              >
                <EditForm
                  staff={this.props.staff}
                  onUpdate={this.props.onUpdateStaff}
                />
              </FadeTransform>
            </div>
          )}
        </div>
      );
  }
}

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: props.staff,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const staffUpdated = {
      id: this.state.staff.id,
      name: this.state.staff.name,
      doB: this.state.staff.doB,
      salaryScale: parseFloat(this.state.staff.salaryScale, 2),
      startDate: this.state.staff.startDate,
      image: "/assets/images/alberto.png",
      departmentId: this.state.staff.departmentId,
      annualLeave: parseInt(this.state.staff.annualLeave, 10),
      overTime: parseInt(this.state.staff.overTime, 10),
    };
    this.props.onUpdate(staffUpdated);
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Col md={4}>
              <Label htmlFor="name">Name</Label>
            </Col>
            <Col md={8}>
              <input
                class="form-control"
                name="name"
                value={this.state.staff.name}
                onChange={(e) =>
                  this.setState({
                    staff: { ...this.state.staff, name: e.target.value },
                  })
                }
              />
              <input type="hidden" name="id" value={this.state.staff.id} />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Label htmlFor="doB">Ngày sinh</Label>
            </Col>
            <Col md={8}>
              <input
                class="form-control"
                type="date"
                name="doB"
                value={this.state.staff.doB}
                onChange={(e) =>
                  this.setState({
                    staff: { ...this.state.staff, doB: e.target.value },
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Label htmlFor="startDate">Ngày vào công ty</Label>
            </Col>
            <Col md={8}>
              <input
                class="form-control"
                type="date"
                name="startDate"
                value={this.state.staff.startDate}
                onChange={(e) =>
                  this.setState({
                    staff: { ...this.state.staff, startDate: e.target.value },
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Label htmlFor="salaryScale">He so luong</Label>
            </Col>
            <Col md={8}>
              <input
                class="form-control"
                name="salaryScale"
                value={this.state.staff.salaryScale}
                onChange={(e) =>
                  this.setState({
                    staff: { ...this.state.staff, salaryScale: e.target.value },
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Label htmlFor="departmentId">Phong ban</Label>
            </Col>
            <Col md={8}>
              <select
                class="form-control"
                name="departmentId"
                value={this.state.staff.departmentId}
                onChange={(e) =>
                  this.setState({
                    staff: {
                      ...this.state.staff,
                      departmentId: e.target.value,
                    },
                  })
                }
              >
                <option value="Dept01">Sale</option>
                <option value="Dept02">HR</option>
                <option value="Dept03">Marketing</option>
                <option value="Dept04">IT</option>
                <option value="Dept05">Finance</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
            </Col>
            <Col md={8}>
              <input
                class="form-control"
                name="annualLeave"
                value={this.state.staff.annualLeave}
                onChange={(e) =>
                  this.setState({
                    staff: { ...this.state.staff, annualLeave: e.target.value },
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Label htmlFor="overTime">Số ngày đã làm thêm</Label>
            </Col>
            <Col md={8}>
              <input
                class="form-control"
                name="overTime"
                value={this.state.staff.overTime}
                onChange={(e) =>
                  this.setState({
                    staff: { ...this.state.staff, overTime: e.target.value },
                  })
                }
              />
            </Col>
          </Row>
          <Button color="success" type="submit">
            Update
          </Button>
        </Form>
      </div>
    );
  }
}

export default StaffDetail;
