import React, { Component } from "react";
import UsersDataService from "../services/user.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeActive = this.onChangeActive.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      active: false,

      submitted: false
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }
 onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeActive(e) {
    this.setState({
      active: e.target.checked
    });
  }
  saveUser() {
    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      active: this.state.active
    };
    UsersDataService.create(data)
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
          active: response.data.active,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newUser() {
    this.setState({
           name: "",
           email: "",
           password: "",
           active: false,
           submitted: false
    });
  }
   render() {
      return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>User added!</h4>
              <button className="btn btn-success" onClick={this.newUser}>
                Add
              </button>
            </div>
          ) : (
            <div>
             <h4>Add New User</h4>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                />
              </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="email"
                  />
                </div>

                 <div className="form-group">
                  <label htmlFor="active">Is Active</label>
                  <input
                    type="checkbox"
                    className="form-control"
                    id="active"
                    required
                    value={this.state.active}
                    onChange={this.onChangeActive}
                    name="active"
                  />
                </div>

              <button onClick={this.saveUser} className="btn btn-success">
                Submit
              </button>

             <label htmlFor="details" id="details"></label>
            </div>
          )}
        </div>
      );
    }
}