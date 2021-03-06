import React from 'react';
import EditProfile from './profileEdit';
import UserPhotoUpdate from './user-photo-update';
import { Redirect } from 'react-router-dom';

export default class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      field: '',
      logout: ''
    };
    this.logOut = this.logOut.bind(this);
    this.editUser = this.editUser.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentWillMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      this.getUser();
    }
  }

  getUser() {
    const { id } = this.props.match.params;
    fetch(`/api/user.php?id=${id}`)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user: user
        });
      })
      .catch(err => console.error(err));
  }

  logOut(event) {
    event.preventDefault();
    this.props.logOutCallback();
    this.setState({
      logout: true
    });
  }

  editUser(event) {
    this.setState({ field: event.target.id });
  }

  cancelEdit() {
    this.setState({ field: '' });
  }

  render() {

    if (!this.state.user && !this.props.currentUser) {
      return <div className="page-loading">Page loading...</div>;
    }

    let redirect = this.state.logout ? <Redirect to="/login"/> : null;
    return (
      <div className="entire-page-container container col col-xl-6">
        {redirect}
        <div className="content container mt-4 p-0">
          <div className="user-pic-enter-info-container row ml-0">
            <div className="pic col-2 p-0">
              <div className="user-avatar-container mb-2">
                <img
                  src=
                    {
                      this.state.user
                        ? this.state.user.avatar
                        : this.props.currentUser.avatar
                    }
                  className="user-profile-pic mb-2"
                  style={{ width: '100%', height: '100%' }}></img>
                {
                  this.state.field === 'avatar' &&
                  <UserPhotoUpdate
                    id={this.state.user.id}
                    cancelCallback={this.cancelEdit}
                    userUpdateCallback={this.props.userUpdateCallback}/>
                }
              </div>
              {
                this.state.user.id === this.props.currentUser.id
                  ? <button
                    type="button"
                    id="avatar"
                    className="btn editUserButton btn-sm shadow-none row ml-2"
                    onClick={this.editUser}
                  >Edit
                  </button>
                  : null
              }
            </div>
            {
              this.state.user.id === this.props.currentUser.id
                ? <div className="enter-info col-10 p-0">
                  <p className="enter-info-text ml-4 mt-2">Edit your info or your profile picture.</p>
                </div>
                : null
            }
          </div>
          <div className="personal-info-container mb-4 mt-3">
            <h2 className="personal-info-text">Personal Info</h2>
          </div>
          {
            this.state.field === 'username'
              ? <EditProfile field="username"
                id=
                  {
                    this.state.user
                      ? this.state.user.id
                      : this.props.currentUser.id
                  }
                cancelCallback={this.cancelEdit}
                userUpdateCallback={this.props.userUpdateCallback}
                value={this.state.user.username} />
              : <div className="username-key-value-container col ml-0 mb-3">
                <div className="username-key row p-0">
                  <p className="col p-0 m-0">Username: </p>
                  {
                    this.state.user.id === this.props.currentUser.id
                      ? <button
                        id="username"
                        onClick={this.editUser}
                        type="button"
                        className="btn editUserButton col btn-sm shadow-none">
                      Edit
                      </button>
                      : null
                  }
                </div>
                <div className="username-value row p-0">
                  <p className="username-value-text col p-0 m-0">
                    {
                      this.state.user
                        ? this.state.user.username
                        : this.props.currentUser.username
                    }
                  </p>
                </div>
              </div>
          }
          {
            this.state.field === 'name'
              ? <EditProfile field="name"
                id=
                  {
                    this.state.user
                      ? this.state.user.id
                      : this.props.currentUser.id
                  }
                cancelCallback={this.cancelEdit}
                userUpdateCallback={this.props.userUpdateCallback}
                value={this.state.user.name} />
              : <div className="name-key-value-container col ml-0 mb-3">
                <div className="name-key row p-0">
                  <p className="col p-0 m-0">Name: </p>
                  {
                    this.state.user.id === this.props.currentUser.id
                      ? <button
                        id="name"
                        onClick={this.editUser}
                        type="button"
                        className="btn editUserButton col btn-sm shadow-none">
                      Edit
                      </button>
                      : null
                  }
                </div>
                <div className="name-value row p-0">
                  <p className="name-value-text col p-0 m-0">
                    {
                      this.state.user
                        ? this.state.user.name
                        : this.props.currentUser.name
                    }
                  </p>
                </div>
              </div>
          }
          {
            this.state.field === 'years'
              ? <EditProfile field="years"
                id=
                  {
                    this.state.user
                      ? this.state.user.id
                      : this.props.currentUser.id
                  }
                cancelCallback={this.cancelEdit}
                userUpdateCallback={this.props.userUpdateCallback}
                value={this.state.user.years} />
              : <div className="experience-key-value-container col ml-0 mb-3">
                <div className="experience-key row p-0">
                  <p className="col p-0 m-0">Experience:</p>
                  {
                    this.state.user.id === this.props.currentUser.id
                      ? <button
                        type="button"
                        id="years"
                        onClick={this.editUser}
                        className="btn editUserButton col btn-sm shadow-none">
                        Edit
                      </button>
                      : null
                  }
                </div>
                <div className="experience-value row p-0">
                  <p className="experience-value-text col p-0 m-0">
                    {
                      this.state.user
                        ? this.state.user.years + ' years'
                        : this.props.currentUser.years + ' years'
                    }
                  </p>
                </div>
              </div>
          }
          {
            this.state.field === 'about_me'
              ? <EditProfile field="about_me"
                id=
                  {
                    this.state.user
                      ? this.state.user.id
                      : this.props.currentUser.id
                  }
                userUpdateCallback={this.props.userUpdateCallback}
                cancelCallback={this.cancelEdit}
                value={this.state.user.about_me} />
              : <div className="about-me-key-value-container col ml-0 mb-3">
                <div className="about-me-key row p-0">
                  <p className="col p-0 m-0">About Me:</p>
                  {
                    this.state.user.id === this.props.currentUser.id
                      ? <button
                        id="about_me"
                        onClick={this.editUser}
                        type="button"
                        className="btn editUserButton col btn-sm shadow-none">
                      Edit
                      </button>
                      : null
                  }
                </div>
                <div className="about-me-value row p-0">
                  <p className="about-me-text col p-0 m-0">
                    {
                      this.state.user
                        ? this.state.user.about_me
                        : this.props.currentUser.about_me
                    }
                  </p>
                </div>
              </div>
          }
          <div className="projects-amount-key-value-container col ml-0 mb-3">
            <div className="projects-amount-key row p-0">
              <p className="col-8 p-0 m-0">Amount of Projects:</p>
            </div>
            <div className="projects-amount-value row p-0">
              <p className="projects-amount-value-text col p-0 m-0">
                {
                  this.state.user
                    ? this.state.user.total_projects
                    : this.props.currentUser.total_projects
                }
              </p>
            </div>
          </div>
          <div className="member-since-key-value-container col ml-0">
            <div className="member-since-key row p-0">
              <p className="col-8 p-0 m-0">Member since:</p>
            </div>
            <div className="projects-amount-value row p-0">
              <p className="projects-amount-value-text col p-0 m-0">
                {
                  this.state.user
                    ? this.state.user.creation.split(' ', 1)
                    : this.props.currentUser.creation.split(' ', 1)
                }
              </p>
            </div>
          </div>
          <div>
            {
              this.state.user.id === this.props.currentUser.id
                ? <button
                  type="button"
                  className="btn searchButton shadow-none mt-4"
                  onClick={this.logOut}>
                Log out
                </button>
                : null }
          </div>
        </div>
      </div>
    );
  }
}
