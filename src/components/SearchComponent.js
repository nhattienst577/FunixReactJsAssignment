import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempValue: "",
    };
  }

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ tempValue: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              className="form-group"
              style={{ paddingTop: "15px", textAlign: "right" }}
            >
              <div className="btn-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên cần tìm kiếm ..."
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
              <div
                className="btn btn-info"
                onClick={(text) => this.props.checkSearch(this.state.tempValue)}
              >
                Search
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
