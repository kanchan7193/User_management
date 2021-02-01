import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";

export default class UserDataServiceList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchName: ""
    };
  }
  componentDidMount() {
    this.retrieveUsers();
  }
  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }
  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data
     });
        console.log(response.data);
     })
      .catch(e => {
        console.log(e);
     });
  }
  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }
  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }
  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchName() {
    UserDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
   render() {
      const { searchName, users, currentUser, currentIndex } = this.state;

      return (
        <div className="list row">
          <div className="col-md-10">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={this.onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchName}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h4>All users</h4>

            <ul className="list-group">
              {users &&
                users.map((user, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveUser(user, index)}
                    key={index}
                  >
                    {user.name}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-outline-danger"
              onClick={this.removeAllUsers}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentUser ? (
              <div>
                <h4>Selected User details</h4>

             <table class="table">
                <tr><th>Name</th><td>{currentUser.name}</td></tr>
                <tr><th>Email</th><td>{currentUser.email}</td></tr>
                <tr><th>Password</th><td>{currentUser.password}</td></tr>
                <tr><th>Status</th><td>
                  {currentUser.active ? "Active" : "Disabled"}
                </td></tr>
                </table>
                <Link
                  to={"/users/" + currentUser.id}
                  className="m3 btn btn-outline-primary"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <span class="badge badge-pill badge-info">Please click on a User...</span>
              </div>
            )}
          </div>
        </div>
      );
    }
}