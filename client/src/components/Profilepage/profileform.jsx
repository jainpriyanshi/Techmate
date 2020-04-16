import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField } from '@material-ui/core';
import ParticlesBg from "particles-bg";
import axios from "axios";
import {IconButton, Grid,Tooltip , Fab} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

class ProfileForm extends Component {
  constructor() { 
    super();
    this.state = {
        name: "",
        email: "",
        bio: "",
        college: "",
        year: "",
        degree: "",
        codechef: "",
        codeforces:  "",
        spoj: "",
        linkedin: "",
        github: "",
        skills: "",
        achievement: []
    };
  }
  componentDidMount() { 
    axios.get('/users/getdata')
    .then((response) => {
        response.data.map(data=>{
            if(data._id===this.props.auth.user.id)
            {
                this.setState({ name : data.name,
                    email : data.email ,
                    codechef : data.codechef,
                    codeforces : data.codeforces ,
                    linkedin : data.linkedin,
                    spoj : data.spoj,
                    github : data.github,
                    skills : data.skills,
                    achievement : data.achievement,
                    bio : data.bio,
                    college : data.college,
                    year : data.year,
                    degree : data.degree});
            }
        });
    });

  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      codechef: this.state.codechef,
      codeforces: this.state.codeforces,
      github: this.state.github,
      spoj: this.state.spoj,
      linedin: this.state.linkedin,
      bio: this.state.bio,
      college: this.state.college,
      year: this.state.year,
      degree: this.state.degree,
      skills: this.state.skills,
      achievement: this.state.achievement,
      email: this.state.email
    };
    axios.post("/users/updateprofile",newUser);
  };
  _handleAchievementChange= event => {
    var list = this.state.achievement.map((option, index) => {
      if (index == event.target.id) return event.target.value;
      return option;
    });
    this.setState({
      achievement: list
    });
  }
  _deleteAchievement(id) {
    this.setState(state => ({
      achievement: state.achievement.filter((el, ind) => ind != id),
    }));
    console.log(this.state);
  }
  addTextField = e => {
      console.log(this.state);
     this.setState({
     achievement: [...this.state.achievement, ""]
    });

  }
  render() {
    return (
      <div>
          <ParticlesBg color="#050d45"  num={90} type="cobweb" bg={true}   position="absolute" />
          <div class="container outer">
                <div  class="inner">
                    <form noValidate onSubmit={this.onSubmit} style={{ margin: "30px 30px "  }}>
                        <div className="field">
                        <TextField
                        disabled
                         variant="outlined"
                         label="Email"
                         halfWidth
                         value={this.state.email}
                         id="email"
                         type="email"
                        />
                        </div>
                        <div className="field">
                        <TextField
                        disabled

                         variant="outlined"
                         label="Name"
                         halfWidth
                         value={this.state.name}
                         id="name"
                         type="text"
                        />
                        </div>
                        <div className="field">
                        <TextField
                          variant="outlined"
                          label="codechef Link"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.codechef}
                          id="codechef"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <TextField
                          variant="outlined"
                          label="Bio"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.bio}
                          id="bio"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <TextField
                          variant="outlined"
                          label="gihtub Link"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.github}
                          id="github"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <TextField
                          variant="outlined"
                          label="codeforces Link"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.codeforces}
                          id="codeforces"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <TextField
                          variant="outlined"
                          label="Spoj Link"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.spoj}
                          id="spoj"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <TextField
                          variant="outlined"
                          label="Linkedin Link"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.linkedin}
                          id="linkedin"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <TextField
                          variant="outlined"
                          label="College"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.college}
                          id="college"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <TextField
                          variant="outlined"
                          label="Degree pursuing"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.degree}
                          id="degree"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <TextField
                          variant="outlined"
                          label="Year Of Passing"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.year}
                          id="year"
                          type="text"
                        />
                      </div>
                      <div className="field">
                        <TextField
                          variant="outlined"
                          label="Skills"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.skills}
                          id="skills"
                          type="text"
                        />
                      </div>
                      {this.state.achievement.map((option, index) => {
                    return (
                        <Grid item>
                        <div class="input-root">
                        <Tooltip title="Edit Achievement">
                            <TextField
                            variant="outlined"
                            label="achievement"
                            fullWidth
                            onChange={this._handleAchievementChange}
                            value={this.state.achievement[index]}
                            id={index}
                            type="text"
                            />
                        </Tooltip>
                        <Tooltip title="Delete Achievement">
                            <IconButton
                            onClick={() => this._deleteAchievement(index)}
                            visible="false"
                            >
                            <CloseIcon />
                            </IconButton>
                        </Tooltip>
                        </div>
                        </Grid>
                        );
                     })}
                    <Tooltip title="Add Achievement">
                        <Fab
                          size="small"
                          onClick={this.addTextField}
                          color="secondary"
                        >
                          <AddIcon />
                        </Fab>
                        </Tooltip>
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
                    </form>
                </div>
                  
              
                
          </div>
      </div>

    );
  }
}

ProfileForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(withRouter(ProfileForm));
