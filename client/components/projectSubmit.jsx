import React from 'react';
import ListBubble from './list-bubble';

class ProjectSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        'name': '',
        'description': '',
        'set_up': '',
        'outcomes': '',
        'goalsToSubmit': [],
        'materialsToSubmit': []
      },
      'image': null,
      'goals': '',
      'materials': '',
      'userId': '',
      'YouTubeVideo': '',
      'formErrors': {
        'name': true,
        'description': true,
        'set_up': true,
        'outcomes': true,
        'goalsToSubmit': true,
        'materialsToSubmit': true
      }
    };

    this.id = null;
    this.materialsArray = [];
    this.goalsArray = [];
    this.image = null;
    this.YouTubeVideo = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoalSubmit = this.handleGoalSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleProjectTitleandImageChange = this.handleProjectTitleandImageChange.bind(this);
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.handleSetUpChange = this.handleSetUpChange.bind(this);
    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.handleOutcomesChange = this.handleOutcomesChange.bind(this);
    this.handleMaterialSubmit = this.handleMaterialSubmit.bind(this);
    this.goToDetails = this.goToDetails.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.deleteMaterial = this.deleteMaterial.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleProjectTitleandImageChange(event) {
    let form = Object.assign({}, this.state.form);
    form.name = event.target.value;
    this.setState({
      form: form
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let error = this.validateForm();

    if (error) {
      return;
    }

    let body = JSON.stringify({
      name: this.state.form.name,
      description: this.state.form.description,
      set_up: this.state.form.set_up,
      outcomes: this.state.form.outcomes,
      goals: this.state.form.goalsToSubmit,
      materials: this.state.form.materialsToSubmit,
      image: `/images/${this.image}`,
      user_id: this.props.userData.id,
      youtubeLink: this.YouTubeVideo
    });

    this.props.addProject(body);
  }

  handleDescriptionChange(event) {
    let form = Object.assign({}, this.state.form);
    form.description = event.target.value;
    this.setState({
      form: form
    });
  }

  handleGoalChange(event) {
    this.setState({
      goals: event.target.value
    });
  }

  handleGoalSubmit(event) {
    event.preventDefault();
    this.goalsArray.push(this.state.goals);
    let form = Object.assign({}, this.state.form);
    form.goalsToSubmit = this.goalsArray;
    this.setState({
      goals: '',
      form: form
    });
  }

  handleSetUpChange(event) {
    let form = Object.assign({}, this.state.form);
    form.set_up = event.target.value;
    this.setState({
      form: form
    });
  }

  handleMaterialChange(event) {
    this.setState({
      materials: event.target.value
    });
    event.preventDefault();
  }

  handleMaterialSubmit(event) {
    event.preventDefault();
    this.materialsArray.push(this.state.materials);
    let form = Object.assign({}, this.state.form);
    form.materialsToSubmit = this.materialsArray;
    this.setState({
      materials: '',
      form: form
    });
  }

  handleOutcomesChange(event) {
    let form = Object.assign({}, this.state.form);
    form.outcomes = event.target.value;
    this.setState({
      form: form
    });
  }

  componentDidUpdate(prevState) {
    if (this.state !== prevState) {
      this.render();
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      const regex = '[\\s]';
      let pictureName = this.props.location.state.file.name;
      let pictureHasSpaces = pictureName.match(regex);
      if (pictureHasSpaces) {
        let pictureBrokenUp = pictureName.split(' ');
        pictureName = pictureBrokenUp.join('');
      }
      this.image = pictureName;
      this.YouTubeVideo = this.props.location.state.youtubeVideoUrl;

    }
  }
  deleteGoal(text) {
    let newGoalsArray = this.goalsArray.filter(item => {
      return item !== text;
    });
    this.goalsArray = newGoalsArray;
    let form = Object.assign({}, this.state.form);
    form.goalsToSubmit = this.goalsArray;
    this.setState({
      form: form
    });

  }
  deleteMaterial(text) {
    let newMaterialsArray = this.materialsArray.filter(item => {
      return item !== text;
    });
    this.materialsArray = newMaterialsArray;
    let form = Object.assign({}, this.state.form);
    form.materialsToSubmit = this.materialsArray;
    this.setState({
      form: form
    });
  }
  goToDetails() {
    return this.id;
  }
  validateForm(name) {
    let error = false;
    let formErrors = Object.assign({}, this.state.formErrors);

    for (let key in this.state.form) {
      if (this.state.form[key].length <= 0) {
        formErrors[key] = false;
        error = true;
      } else {
        formErrors[key] = true;
      }
    }

    this.setState({
      formErrors: formErrors
    });
    return error;
  }

  render() {
    if (!this.props.userData) {
      return (
        <div className="container">
          <h1 className="d-flex justify-content-center">Please log in</h1>
        </div>
      );
    }
    return (
      <div className= "submitForm container row p-0 justify-content-center">

        <div className="form container col col-md-8 d-flex justify-content-center m-0">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label >Project Title</label>
              <input
                onChange={this.handleProjectTitleandImageChange}
                type="text"
                className="form-control projectEntry"
                placeholder="Project Entry"></input>
              {this.state.formErrors.name ? null : <div className="invalid-error">Field must have an entry</div>}
            </div>
            <div className="description form-group">
              <label >Description</label>
              <textarea onChange={this.handleDescriptionChange}
                className="form-control descriptionBox" placeholder="Description Text" rows="3"></textarea>
              {this.state.formErrors.description ? null : <div className="invalid-error">Field must have an entry</div>}
            </div>
            <div>
              <div className="goals form-group inline">
                <label className="col-form-label">Goals</label>
                <div className="input-group shadow-none p-0">
                  <input type="text"
                    className="goalSubmit form-control"
                    onChange={this.handleGoalChange}
                    value={this.state.goals}
                    placeholder="Goals" />

                  <div className= "input-group-append">
                    <button className="btn searchButton btn-outline-secondary addBubbleButton shadow-none" type= "button" onClick={this.handleGoalSubmit}>+</button>
                  </div>
                </div>
                {this.state.formErrors.goalsToSubmit ? null : <div className="invalid-error">Field must have an entry</div>}
              </div>
              <div className="goal-bubble-container row p-0 m-0">
                {this.state.form.goalsToSubmit.map((goal, index) => {
                  return <ListBubble
                    id={'somegoal'}
                    text={goal}
                    key={index}
                    minWidth="140px"
                    maxWidth="140px"
                    deleteGoal={this.deleteGoal} />;
                })}
              </div>
            </div>
            <div>
              <div className="materials form-group inline ">
                <label
                  className="col-form-label">Materials</label>
                <div className="input-group shadow-none p-0">
                  <input onChange={this.handleMaterialChange}
                    type="text" className="materialSubmit form-control"
                    placeholder="Materials Entry" value={this.state.materials}></input>
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary searchButton shadow-none" onClick={this.handleMaterialSubmit}>+</button>
                  </div>

                </div>

              </div>
              {this.state.formErrors.materialsToSubmit ? null : <div className="invalid-error">Field must have an entry</div>}
              <div className="row materials-bubble-container m-0 p-0">
                {this.state.form.materialsToSubmit.map((material, index) => {
                  return <ListBubble
                    id={'somematerial'}
                    text={material}
                    key={index}
                    minWidth="140px"
                    maxWidth="140px"
                    deleteMaterial={this.deleteMaterial} />;
                })}
              </div>
            </div>
            <div>
              <div className="set-up form-group">
                <label>Set-Up</label>
                <textarea onChange={this.handleSetUpChange}
                  type="text"
                  className="form-control setUpEntry" id="setUp"
                  placeholder="Set-Up Entry" />
                <small className="text-muted"> Separate instructions with commas</small>
                {this.state.formErrors.set_up ? null : <div className="invalid-error">Field must have an entry</div>}
              </div>
              <div className="outcomes form-group">
                <label>Outcomes</label>
                <textarea onChange= {this.handleOutcomesChange}
                  className="form-control outcomeBox"
                  id="outcomeBox"
                  placeholder="Outcome Entries"
                  rows="3"></textarea>
                {this.state.formErrors.outcomes ? null : <div className="invalid-error">Field must have an entry</div>}
              </div>
              <button onClick={this.handleSubmit}
                type="submit"
                className="projectSubmitButton btn btn-outline-light"
                style={{ color: 'white' }}>
                Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default ProjectSubmit;
