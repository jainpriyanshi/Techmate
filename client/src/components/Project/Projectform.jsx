import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField } from '@material-ui/core';
import ParticlesBg from "particles-bg";
import classnames from "classnames";  
import 
{Button, 
  Grid,
  Tooltip , 
  IconButton, 
  Snackbar,
  Menu,
  MenuItem} 
  from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {Add,
  Delete} from '@material-ui/icons';
import { proposeProject } from "../../actions/authActions";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class EditProject extends Component {
  constructor() { 
    super();
    this.state = {
        contactmail: "",
        topic: "",
        title: "",
        technology: "",
        deadline: new Date('2020-05-20T21:11:54'),
        idea: "",
        githubrepo: "",
        team: [{
          name: "",
          role: "",
        }],
        open : false,
        openerror: false,
        errors: {},
        menu1: null,
        menu2: null,
        activeStep: 0,
        steps: ['Select Category Of Project', 'Enter Title Of Project', 'Technology Needed for Project', 'Propose Your Idea', "Enter Contact Mail", "Deadline Of Project" , "Github Link of Project", " Add Team Member "],
    };
  }
  handleNext = () => {
    this.setState({activeStep: this.state.activeStep+1});
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep-1});
  };
  getStepContent(step) {
    const { errors } = this.state
    switch (step) {
      case 0:
        return (
            <div>
                 <div className="field"> 
                 <TextField
                    required
                    label="Category"
                    halfWidth
                    value={this.state.topic}
                    error={errors.topic}  
                    id="topic"
                    type="text"
                    className={classnames("", {
                      invalid: errors.title
                    })}
                    style={{width: "70%"}}
                  />
              <Tooltip title="Select category of project">  
              <Button 
              aria-controls="simple-menu" 
              aria-haspopup="true" 
              onClick={this.menuClick} 
              style={{ size:"10%", marginTop:"20px", marginBottom:"20px"}}
              >
                <ExpandMoreIcon />
              </Button>
              </Tooltip>  
              <Menu
              id="simple-menu"
              open={Boolean(this.state.menu1)}
              onClose={this.menuClose}
              >
                  <MenuItem index="Web Development"  onClick={this.menuhandle}> Web Development</MenuItem>
                  <MenuItem index="App Development" onClick={this.menuhandle}> App Development </MenuItem>
                  <MenuItem index="Competitive Programming" onClick={this.menuhandle}>Competitive Programming</MenuItem>
                  <MenuItem index="Game Development" onClick={this.menuhandle}> Game Development </MenuItem>
                  <MenuItem index="Machine Learning" onClick={this.menuhandle}> Machine Learning </MenuItem>
                  <MenuItem index="Cloud Computing" onClick={this.menuhandle}> Cloud Computing </MenuItem>
                  <MenuItem index="Artificial Intelligence" onClick={this.menuhandle}> Artificial Intelligence</MenuItem>
                  <MenuItem index="Blockchain" onClick={this.menuhandle}> Blockchain </MenuItem>
                  <MenuItem index="Image Processing" onClick={this.menuhandle}> Image Processing </MenuItem>
              </Menu>
              </div>
            </div>
        )
      case 1:
        return (
          <div className="field">
          <TextField
            required
            variant="outlined"
            label="Title"
            fullWidth
            onChange={this.onChange}
            value={this.state.title}
            error={errors.title}  
            id="title"
            type="text"
            className={classnames("", {
              invalid: errors.title
            })}
          />
          <span className="text-danger">{errors.title}</span>
          </div>
        )
      case 2:
        return  (
          <div className="field">
            <TextField
              required
              variant="outlined"
              label="Technologies"
              fullWidth
              onChange={this.onChange}
              value={this.state.technology}
              error={errors.technology}  
              id="technology"
              type="text"
              className={classnames("", {
                invalid: errors.technology
              })}
            />
          <span className="text-danger">{errors.technology}</span>
        </div>
        )
      case 3: 
      return (
        <div className="field">
        <TextField
          required
          variant="outlined"
          label="Idea"
          fullWidth
          multiline
          rows={6}
          onChange={this.onChange}
          value={this.state.idea}
          error={errors.idea}  
          id="idea"
          type="text"
          className={classnames("", {
            invalid: errors.idea
          })}
        />
        <span className="text-danger">{errors.idea}</span>
        </div>
      )
      case 4: 
      return (
        <div className="field">
        <TextField
          required
          variant="outlined"
          label="Mail"
          fullWidth
          onChange={this.onChange}
          value={this.state.contactmail}
          error={errors.contactmail}  
          id="contactmail"
          type="text"
          className={classnames("", {
            invalid: errors.contactmail
          })}
        />
        <span className="text-danger">{errors.email}</span>
        </div>
      )
      case 5:
        return (
          <div className="field">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="deadline"
              label="Deadline"
              format="dd/MM/yyyy"
              value={this.state.deadline}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                
              }}
              style={{width: "50%", marginTop:"20px", marginBottom:"20px"}}
            />
            </MuiPickersUtilsProvider>
            <span className="text-danger">{errors.deadline}</span>
            </div>
        )
      case 6:
        return (
          <div className="field">
            <TextField
              required
              variant="outlined"
              label="Link"
              fullWidth
              onChange={this.onChange}
              value={this.state.githubrepo}
              error={errors.githubrepo}  
              id="githubrepo"
              type="text"
              className={classnames("", {
                invalid: errors.githubrepo
              })}
            />
            <span className="text-danger">{errors.github}</span>
            </div>
        ) 
        case 7 : 
        return (
            <div>
               {this.state.team.map((option, index) => {
                  return (
                  <Grid item key="index">
                  <div class="input-root">
                  <Tooltip title="Edit Team">    
                      <div className="field">
                      <TextField
                      label="Team Member"
                      fullWidth
                      onChange={this._handleTeamChange}
                      value={this.state.team[index].name}
                      id={index}
                      type="text"
                      />
                      </div>
                  </Tooltip>
                  <div classNamw="field">
                  <TextField
                      label="Role(Mentor/Mentee)"
                      fullwidth
                      value={this.state.team[index].role}
                      onChange={this._handleRoleChange}
                      id={index}
                      type="text"
                      />
                      </div>
                  
                  <Tooltip title="Delete Team">
                    <IconButton aria-label="delete" onClick={() => this._deleteTeamMember(index)}
                      visible="flase" style={{size:"10px", marginTop:"10px", marginBottom:"10px"}}>
                        <Delete />
                      </IconButton>
                  </Tooltip>
                  </div>
                  </Grid>
                  );
                })}
                
              <Tooltip title="Add Member">
                  <Button 
                  size="large"
                  onClick={this.addTextField}
                  style={{
                      width:"100%",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginBottom: "10px",
                      marginTop: "10px"
                    }}>
       
                    <Add/>
                  </Button>

                  </Tooltip>
            </div>
        )
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const newProject = {
       team : this.state.team,
       topic: this.state.topic,
       technology: this.state.technology,
       title: this.state.title,
       contactmail: this.state.contactmail,
       idea: this.state.idea,
       deadline: this.state.deadline,
       github: this.state.githubrepo,
       proposedby: this.props.auth.user.name,
       proposedid: this.props.auth.user.id
    };

    axios.post("/projects/propose",newProject)
    .then(res=> 
      {this.setState({
        contactmail: "",
        topic: "",
        title: "",
        technology: "",
        deadline: new Date('2020-05-20T21:11:54'),
        idea: "",
        githubrepo: "",
        team: [{
          name: "",
          role: "",
        }],
        open : true,
        errors: {},
        activeStep: 0
      })
    })
      .catch(err => {
        console.log(err.response.data);
        this.setState({errors: err.response.data , activeStep: 0, openerror: true});
    })  
    console.log(this.state);
    
  }; 
  menuClick = (event) => {
    this.setState({menu1: event.currentTarget})
  }
  menuClose = () => {
    this.setState({menu1: null});
  }
  menuhandle = (e) => {
       e.preventDefault();
       this.setState({topic: e.target.getAttribute('index'),
                      menu1: null });
  }
  menu2Click = (event) => {
    this.setState({menu2: event.currentTarget})
  }
  menu2Close = () => {
    this.setState({menu2: null});
  }
  menu2handle = (e) => {
       e.preventDefault();
       var list = this.state.team.map((option, index) => {
         console.log(index);
         console.log(e.target.getAttribute('id'));
        if (index == e.target.id) 
        {option.role = e.target.getAttribute('ind');
        }
        return option;
        });
        this.setState({
          team: list,
          menu2: null,
        });
        console.log(list);
  }
  handleDateChange = (date) => {
    this.setState({deadline: date});
    console.log(this.state);
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false , openerror: false});
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        open: false,
      });
    }
  }
 
  _handleTeamChange= event => {
    var list = this.state.team.map((option, index) => {
      if (index == event.target.id) {
        option.name= event.target.value;
      };
      return option;
    });
    this.setState({
      team: list  
    });
  }
  _handleRoleChange= event => {
    var list = this.state.team.map((option, index) => {
      if (index == event.target.id) {
        option.role= event.target.value;
      };
      return option;
    });
    this.setState({
      team: list  
    });
  }
  _deleteTeamMember(id) {
    this.setState(state => ({
       team: state.team.filter((el, ind) => ind != id),
    }));
    console.log(this.state);
  }
  addTextField = e => {
     
     this.setState({
     team: [...this.state.team, {name: "" , role: ""}]
    });
    console.log(this.state);
  }
  render() {
    return (
        <div>
          <ParticlesBg color="#050d45"  num={90} type="cobweb" bg={true}   position="absolute" />
           <div class="container">
                <div  class="inner">
                  <h1>Propose A Project</h1> 
                    <form noValidate onSubmit={this.onSubmit} style={{ margin: "30px 30px "  }}>
                    <Stepper activeStep={this.state.activeStep} orientation="vertical"  >
                    {this.state.steps.map((label, index) => (
                    <Step>
                    <StepLabel >{label}</StepLabel>
                    <StepContent>
                    <Typography>{this.getStepContent(index)}</Typography>
                    <div>
                    <div>
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                    >
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    </div>
                    </div>
                    </StepContent>
                    </Step>
                        ))}
                        </Stepper>
                        {this.state.activeStep === this.state.steps.length && (
                        <Paper square elevation={0}>
                          <Typography>All steps completed - you&apos;re finished</Typography>
                          <button 
                            type="button" 
                            class="btn btn-primary btn-lg btn-block card-1" 
                            type="submit" 
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                              }}>
                                  Save
                        </button>
                          
                        </Paper> )}     

                      
                        <Snackbar style={{width: "100%"}}open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}>
                          <Alert onClose={this.handleClose} severity="success">
                             Information updated Successfully
                          </Alert>
                        </Snackbar>
                        <Snackbar style={{width: "100%"}}open={this.state.openerror} autoHideDuration={4000} onClose={this.handleClose}>
                          <Alert onClose={this.handleClose} severity="error">
                              Fill all Information
                          </Alert>
                        </Snackbar>
                    </form>
                </div>
          </div>
      </div>

    );
  }
}

EditProject.propTypes = {
  proposeProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { proposeProject }
)(withRouter(EditProject));
