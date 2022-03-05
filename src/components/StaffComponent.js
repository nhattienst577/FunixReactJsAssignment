import React, { useState } from "react";
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (value) => value && value.length > 0 ;
const maxLength = (len) => (value) => !(value) || (value.length <= len);
const isNumber = (value) => !(value) ||!isNaN(Number(value));

// function stafflist(staff) {
//   return(
//     <Card className="App col-lg-2 col-md-4 col-6">
//          <Link to={`/nhan-vien/${staff.id}`} >
//              <CardImg width="100%" src={staff.image} alt={staff.name} />
//              <CardTitle>{staff.name}</CardTitle> 
//          </Link>
//     </Card>
//   )
// }

const StaffList = ({staffs, updateState}) => {

  //khai bao state
  const [ names, setName ] = useState(null);
  const [ searchs, setSearch ] = useState(null);
  const [ toggleAddFormModal, setToggleAddFormModal ] = useState(null);
  const [ dayB, setDayB] = useState("");
  const [ startDate, setStartDate ] = useState("");

  //render staffList
  const stafflist = staffs.map((staff) =>{
    return(
        <Card className="App col-lg-2 col-md-4 col-6">
          <Link to={`/nhan-vien/${staff.id}`} >
              <CardImg width="100%" src={staff.image} alt={staff.name} />
              <CardTitle>{staff.name}</CardTitle> 
          </Link>
        </Card>

    );
  });
  

  //ham search
  const handleSearch = (event, names) => {
    //ngan khong cho goi form khi an vao submit
    event.preventDefault();
    const name = names.value;
    const List = staffs.filter((staff) => {
        if(name === ""){
          return staff;
        }
        //List chuyen cac ky tu trong chuoi sang thuong va tao ra chuoi moi. 
        //includes de kiem tra chuoi con name co nam trong chuoi hay khong
        else if(staff.name.toLowerCase().includes(name.toLowerCase())){
          return staff;
        }
    }).map((staff) =>{
      return(
        <Card key={staff.id} className="col-6 col-lg-2 col-md-4">
            <Link to={`/nhan-vien/${staff.id}`}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle>{staff.name}</CardTitle> 
            </Link>
        </Card>
      );
    })
    setSearch(List);
    names.value="";
  };

  //ham submit
  const handleSubmit = (values) => {
      const newStaffs = {
        id: staffs.length,
        name: values.name,
        dayB: dayB,
        startDate: startDate,
        department: values.department,
        salaryScale: values.salaryScale,
        annualLeave: values.annualLeave,
        overTime: values.overTime,
        image: "/assets/images/alberto.png",
      };

      setToggleAddFormModal(!toggleAddFormModal);
      updateState(newStaffs);
  };

  return(
    <div className="container">
        <div className="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/nhan-vien">App</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>Nhân Viên</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div className="row">
          <div className="col-5">
              <h3>Nhân viên</h3>
          </div>
          <div className="col-3">
          <Button type="submit" className="btn btn-info" 
                  onClick={() => setToggleAddFormModal(!toggleAddFormModal)}>Thêm</Button>
          </div>
          <div className="col-4">
              <form className="form-inline">
                  <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nhập tên cần tìm kiếm"
                        ref={(input) => {
                          return setName(input);
                        }} />
                  <Button 
                        type="submit" 
                        className="btn btn-info" 
                        onClick={(event) => handleSearch(event, names)}>Tìm</Button>
              </form>
          </div>
        </div>
        <div className="row">
          {searchs === null ? stafflist
            // : searchs.length == 0 ? "Tên nhân viên tìm kiếm không có trong danh sách"
             : searchs
          }
      </div>

      {/* Modal */}
      <Modal isOpen={toggleAddFormModal} toggle={(toggleAddFormModal) => setToggleAddFormModal(!toggleAddFormModal)}>
           <ModalHeader isOpen={toggleAddFormModal} toggle={(toggleAddFormModal) => setToggleAddFormModal(!toggleAddFormModal)} >
             Thêm Nhân Viên
            </ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => handleSubmit(values)}>
                  <Row className="form-group">
                    <Label htmlFor="name" md={3}>Tên</Label>
                    <Col md={9}>
                        <Control.text 
                            model=".name" 
                            id="name" 
                            name="name" 
                            className="form-control"
                            validators={{required, maxLength: maxLength(15)}}
                        />
                        <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{
                              required: "Yêu cầu nhập.",
                              maxLength: "Hãy nhập dưới 15 ký tự.",
                            }}
                        />
                    </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="dayB" md={3}>Ngày Sinh</Label>
                      <Col md={9}>
                          <Control.text 
                              model=".dayB" 
                              type="date" 
                              id="dayB" 
                              name="dayB" 
                              value={dayB} 
                              validators={{required}}
                              onChange={(event) => {
                                  return setDayB(event.target.value);
                                }} />
                          <Errors
                            className="text-danger"
                            model=".dayB"
                            show="touched"
                            messages={{
                              required: "Yêu cầu nhập. ",
                            }}
                          />
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="startDate" md={3}>Ngày Vào Công Ty</Label>
                      <Col md={9}>
                          <Control.text 
                              model=".startDate" 
                              type="date" 
                              id="startDate" 
                              name="startDate" 
                              className="form-group"
                              validators={{required}}
                              onChange={(event) => {
                                    return setStartDate(event.target.value)
                                  }}/>
                          <Errors
                            className="text-danger"
                            model=".startDate"
                            show="touched"
                            messages={{
                              required: "Yêu cầu nhập. ",
                            }}
                          />
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="department" md={3}>Phòng Ban</Label>
                      <Col>
                          <Control.select 
                              model=".department" 
                              id="department" 
                              name="department" 
                              className="form-control" 
                              defaultValue="Sale" >
                                <option>Sale</option>
                                <option>HR</option>
                                <option>Marketing</option>
                                <option>IT</option>
                                <option>Finance</option>
                          </Control.select>
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="salaryScale" md={3}>Hệ Số Lương</Label>
                      <Col md={9}>
                          <Control.text 
                            model=".salaryScale"
                            id="salaryScale"
                            name="salaryScale"
                            className="form-control"
                            validators={{required, isNumber}}
                          />
                          <Errors
                            className="text-danger"
                            model=".salaryScale"
                            show="touched"
                            messages={{
                              required: "Yêu cầu nhập.",
                              isNumber: "Hãy nhập số.",
                            }}
                          />
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="annualLeave" md={3}>Số Ngày Nghỉ Còn Lại</Label>
                      <Col md={9}>
                        <Control.text
                          model=".annualLeave"
                          id="annualLeave"
                          name="annualLeave"
                          className="form-control"
                          validators={{required, isNumber}}
                        />
                          <Errors
                            className="text-danger"
                            model=".salaryScale"
                            show="touched"
                            messages={{
                              required: "Yêu cầu nhập.",
                              isNumber: "Hãy nhập số.",
                            }}
                          />
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="overTime" md={3}>Số Ngày Đã Làm Thêm</Label>
                      <Col md={9}>
                        <Control.text 
                          model=".overTime"
                          id="overTime"
                          name="overTime"
                          className="form-control"
                          validators={{required, isNumber}}
                        />
                          <Errors
                            className="text-danger"
                            model=".salaryScale"
                            show="touched"
                            messages={{
                              required: "Yêu cầu nhập.",
                              isNumber: "Hãy nhập số.",
                            }}
                          />
                      </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={{ size: 3, offset: 3 }}>
                      <Button type="submit" className="btn btn-info">
                        Thêm
                      </Button>
                    </Col>
                  </Row>
              </LocalForm>
            </ModalBody>
      </Modal>          
    </div>
  );
}

export default StaffList;
