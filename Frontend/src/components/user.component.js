import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeActive = this.onChangeActive.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        name: "",
        email: "",
        password: "",
        active: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }
  onChangePassword(e) {
      const password = e.target.value;

      this.setState(prevState => ({
        currentUser: {
          ...prevState.currentUser,
          password: password
        }
      }));
    }

    onChangeActive(e) {
        const active = e.target.checked;

        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            active: active
          }
        }));
      }

    getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentUser.id,
      name: this.state.currentUser.name,
      email: this.state.currentUser.email,
      password: this.state.currentUser.password,
      active: this.state.currentUser.active,
      published: status
    };

    UserDataService.update(this.state.currentUser.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "This user is updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
     const { currentUser } = this.state;

     return (
       <div>
         {currentUser ? (
           <div className="edit-form">
             <h4>Selected User Details</h4>
             <form>
               <div className="form-group">
                 <label htmlFor="name">Name</label>
                 <input
                   type="text"
                   className="form-control"
                   id="name"
                   value={currentUser.name}
                   onChange={this.onChangeName}
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="email">Email Id</label>
                 <input
                   type="text"
                   className="form-control"
                   id="email"
                   value={currentUser.email}
                   onChange={this.onChangeEmail}
                 />
               </div>

              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={currentUser.password}
                    onChange={this.onChangePassword}
                    name="email"
                  />
                </div>

                 <div className="form-group">
                  <label htmlFor="active">Active</label>
                  <input
                    type="checkbox"
                    className="form-control"
                    id="active"
                    value={currentUser.active}
                    onChange={this.onChangeActive}
                    name="active"
                  />
                </div>
                <div class="btn-toolbar">
                <button className="mr-3 btn btn-outline-danger"
               onClick={this.deleteUser}
             >
               Delete
             </button>

             <button
               type="submit"
               className="mr-3 btn btn-outline-success"
               onClick={this.updateUser}
             >Update
             </button>
</div>


            </form>
             <p>{this.state.message}</p>
           </div>
         ) : (
           <div>
             <br />
             <p>Please click on a User...</p>
           </div>
         )}
       </div>
     );
   }
}