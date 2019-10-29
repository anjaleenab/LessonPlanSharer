import React from 'react';
import { Link } from 'react-router-dom';

export default class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project,
      user_id: this.props.userData,
      currentUser: this.props.currentUser
    };
  }

  render() {
    return (
      <div className="edit-button-container">
        <button
          type="button"
          className="editProjectButton btn dropdown-toggle shadow-none dropdown-toggle-split mr-1"
          data-toggle="dropdown"> Edit Project</button>
        <div className="dropdown-menu dropdown-menu-right pl-2">
          <Link to={{
            pathname: '/edit',
            state: {
              projectToEdit: this.props.project
            }
          }} >
            <div
              className="edit-item m-1">Edit</div>
          </Link>
          <div
            className="edit-item m-1"
            onClick={this.props.modalToggle}>Delete</div>
        </div>
      </div>
    );
  }

}
