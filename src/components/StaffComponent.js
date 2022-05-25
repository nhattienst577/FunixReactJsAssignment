import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  Col,
  Input,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "./LoadingComponent";
import { Control, LocalForm, Errors } from "react-redux-form";
import { FadeTransform } from "react-animation-components";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

function RenderStaffItem({ staff, onDeleteStaff }) {
  // const List = staffs.staffs.map((staff) => {
  //console.log("IMAGE " + JSON.stringify(staffs.image));
  // var yourUrlImage = staff.image;
  // var results = yourUrlImage.slice(1);
  // console.log("url : " + results);
  return (
    <FadeTransform
      in
      transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
    >
      <Link to={`/nhan-vien/${staff.id}`}>
        <Card>
          <CardImg
            width="100%"
            // /asset/images/alberto.png
            // src="assets/images/alberto.png"
            src={staff.image}
            alt={staff.name}
          />
          <CardTitle>{staff.name}</CardTitle>
        </Card>
      </Link>
      <Button color="danger" onClick={() => onDeleteStaff(staff.id)}>
        Delete
      </Button>
    </FadeTransform>
  );
  // });
  // return <div className="row">{List}</div>;
}

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameF: "",
    };

    this.handleSearch = this.handleSearch.bind(this);
  }
  //lay duoc nameSearch tu input
  handleSearch(event) {
    const nameS = event.target.nameS.value;
    event.preventDefault();
    this.setState({ nameF: nameS });
  }

  render() {
    //nhận được props staffs từ main sau đó filter nó ra để kiểm tra 1 số yêu cầu trước khi map
    const stafflist = this.props.staffs.staffs
      .filter((val) => {
        // nếu nameF rỗng đúng như ban đầu thì trả về mảng đk đúng
        if (this.state.nameF === "") return val;
        //nếu có thay đổi thì đối tượng nhập vào sẽ tìm kiếm trong includes và trả về value
        else if (
          val.name.toLowerCase().includes(this.state.nameF.toLowerCase())
        )
          return val;
        return 0;
      })
      .map((val) => {
        return (
          <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
            <RenderStaffItem
              staff={val}
              onDeleteStaff={this.props.onDeleteStaff}
            />
          </div>
        );
      });
    if (this.props.staffs.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffs.errMess) {
      return (
        <div className="container">
          <div className="row">
            <p>{this.props.staffs.errMess}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/nhan-vien">App</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Nhân Viên</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <div className="col-lg-5 col-md-3 mt-3">
              <h3>Nhân Viên</h3>
            </div>
            <div className="col-lg-1 mt-3">
              {/* khi nguoi dung nhap du lieu vao se duoc luu vao onAddStaff va truyen du lieu do qua main */}
              <AddStaffForm onAdd={this.props.onAddStaff} />
            </div>
            {/* form search */}
            <div className="col-lg-6 col-md-6 mt-3">
              <form onSubmit={this.handleSearch} className="form-group row">
                <div className="col-8 col-md-8">
                  <input
                    type="text"
                    name="nameS"
                    className="form-control"
                    placeholder="Tìm kiếm nhân viên ..."
                  />
                </div>
                <div className="col-4 col-md-4">
                  <button className="btn btn-success" type="submit">
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12">
            <hr />
          </div>
          <div className="row">{stafflist}</div>
        </div>
      );
    }
  }
}

class AddStaffForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      doB: "",
      startDate: "",
      departmentId: "Dept02",
      image: "/assets/images/alberto.png",
      touched: {
        doB: false,
        startDate: false,
      },
    };
    // Ràng buộc 2 chiều đối với các hàm được khai báo bên dưới
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Hàm xử lý trả touched về true sau khi người dùng không nhập gì mà thoát khỏi input text
  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  //Hàm xử lý việc nhập liệu vào ô input, thay đổi trạng thái dữ liệu
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  //Khi submit form add tạo 1 đối tượng mới
  handleSubmit = (value) => {
    if (!this.state.doB || !this.state.startDate)
      this.setState({
        touched: { doB: true, startDate: true },
      });
    else {
      const newStaff = {
        name: value.name,
        doB: this.state.doB,
        startDate: this.state.startDate,
        departmentId: this.state.departmentId,
        salaryScale: parseInt(value.salaryScale, 10),
        annualLeave: parseInt(value.annualLeave, 10),
        overTime: parseInt(value.overTime, 10),
        image: "/assets/images/user.png",
      };
      this.props.onAdd(newStaff);
    }
  };

  //Hàm kiểm tra ngày tháng có được nhập hay không
  validate(doB, startDate) {
    const errors = {
      doB: "",
      startDate: "",
    };

    if (this.state.touched.doB && doB.length < 1) errors.doB = "Yêu cầu nhập";
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Yêu cầu nhập";

    return errors;
  }

  toggleModal(event) {
    event.preventDefault();
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  render() {
    const errors = this.validate(this.state.doB, this.state.startDate); // Tạo biến báo lỗi khi người dùng khai báo thiếu
    return (
      <>
        <div className="col-2 col-auto">
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-plus fa-lg"></span>
          </Button>
        </div>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
              <Row className="control-group">
                <Label htmlFor=".name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    className="form-control"
                    id=".name"
                    name="name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                  />
                  <Errors
                    model=".name"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu  ",
                      minLength: "nhập nhiều hơn 3 ký tự",
                      maxLength: "Yêu cầu nhập ít hơn 30 ký tự",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    name="doB"
                    id="doB"
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <select
                    name="departmentId"
                    id="department"
                    className="form-control"
                    value={this.state.departmentId}
                    onChange={(e) =>
                      this.setState({ departmentId: e.target.value })
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
              <Row className="control-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="1.0 -> 3.0"
                    validators={{
                      required,
                      isNumber,
                    }}
                    defaultValue="1"
                    className="form-control"
                  />
                  <Errors
                    model=".salaryScale"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      isNumber: "Phải là chữ số",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    defaultValue="0"
                    validators={{
                      required,
                      isNumber,
                    }}
                    className="form-control"
                  />
                  <Errors
                    model=".annualLeave"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      isNumber: "Phải là chữ số",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    defaultValue="0"
                    validators={{
                      required,
                      isNumber,
                    }}
                    className="form-control"
                  />
                  <Errors
                    model=".overTime"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      isNumber: "Phải là chữ số",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="success">
                    Thêm
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default StaffList;
