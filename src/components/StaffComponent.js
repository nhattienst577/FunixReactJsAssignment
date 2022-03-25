import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardSubtitle,
  Button,
  Modal,
  Col,
  Form,
  Input,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderStaffItem({ staff }) {
  return (
    <Card className="App">
      <Link to={`/nhan-vien/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardTitle>{staff.name}</CardTitle>
      </Link>
    </Card>
  );
}

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "Sale",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "/assets/images/alberto.png",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false,
      },

      nameF: "",
      modalOpen: false,
    };
    this.timNhanvien = this.timNhanvien.bind(this);
  }

  //lay duoc ten nameS nhap tu input
  timNhanvien(event) {
    event.preventDefault();
    const nameS = event.target.nameS.value;
    this.setState({ nameF: nameS });
  }

  render() {
    //nhận được props staffs từ main sau đó filter nó ra để kiểm tra 1 số yêu cầu trước khi map
    const stafflist = this.props.staffs
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
            <RenderStaffItem staff={val} />
          </div>
        );
      });

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
            <Button outline onClick={this.toggleModal}>
              <span className="fa fa-plus fa-lg"></span>
            </Button>
          </div>
          {/* form search */}
          <div className="col-lg-6 col-md-6 mt-3">
            <form onSubmit={this.timNhanvien} className="form-group row">
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

export default StaffList;
