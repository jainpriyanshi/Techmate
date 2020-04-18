  import React, { Component } from "react";
  import { withRouter } from "react-router-dom";
  import PropTypes from "prop-types";
  import { connect } from "react-redux";
  import { TextField } from '@material-ui/core';
  import ParticlesBg from "particles-bg";
  import axios from "axios";
  import {Button, Grid,Tooltip , IconButton, Snackbar} from '@material-ui/core';
  import MuiAlert from '@material-ui/lab/Alert';
  import { AccountCircle, Add,Delete, GitHub} from '@material-ui/icons';

  import CC from '../Images/codechef.jpg';
  import CF from '../Images/codeforces.png';
  import SPOJ from "../Images/spoj.jpeg";
  import IN from "../Images/linkedin.png";

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
          achievement: [],
          open : false
      };
    }
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({open: false});
    };
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
      this.setState({open: true});
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
            <div class="container">
                  <div  class="inner">
                  <h3> <AccountCircle  style={{ fontSize: 50 }}/> <b>Your Profile </b></h3>
                    <br></br>
                      <form noValidate onSubmit={this.onSubmit} style={{ margin: "30px 30px "  }}>
                          
                      <h6>  <b>About You </b></h6>
                          <div className="field">
                          <TextField
                          disabled
                          variant="outlined"
                          label="Email"
                          halfWidth
                          value={this.state.email}
                          id="email"
                          type="email"
                          style={{width: "47%"}}
                          />
                          <TextField    
                          disabled
                          variant="outlined"
                          label="Name"
                          halfWidth
                          value={this.state.name}
                          id="name"
                          type="text"
                          style={{width: "47%", marginLeft:"6%"}}
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
                        <img style={{width:"60px"}}src={IN} alt="Techmate" />
                      
                          <TextField
                      
                            variant="outlined"
                            label="Linkedin Link"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.linkedin}
                            id="linkedin"
                            type="text"
                            style={{width: "70%", marginLeft:"10%"}}
                          />
                        </div>

                        <br></br>
                        <h6>  <b>Higher Education</b></h6>

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
                            label="Major"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.degree}
                            id="degree"
                            type="text"
                            style={{width: "47%"}}
                          />
                      
                          <TextField
                            variant="outlined"
                            label="Year"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.year}
                            id="year"
                            type="text"
                            style={{width: "47%", marginLeft:"6%"}}
                          />
                        </div>
                        <br></br>
                        <h6>  <b>Skills and Achievements</b></h6>
                        
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
                          <Grid item key="index">
                          <div class="input-root">
                          <Tooltip title="Edit Achievement">    
                              <TextField
                              variant="outlined"
                              label="Achievement"
                              fullWidth
                              onChange={this._handleAchievementChange}
                              value={this.state.achievement[index]}
                              id={index}
                              type="text"
                              style={{width:"75%", marginTop:"20px", marginBottom:"20px"}}
                              />
                              

                          </Tooltip>
                          <Tooltip title="Delete Achievement">
                            

                            <IconButton aria-label="delete" onClick={() => this._deleteAchievement(index)}
                              visible="flase" style={{size:"10%", marginTop:"20px", marginBottom:"20px"}}>
                                <Delete />
                              </IconButton>
                          </Tooltip>
                          </div>
                          </Grid>
                          );
                      })}
                      
                      <Tooltip title="Add Achievement">
                          {/* <Button
                            
                            size="medium"
                            onClick={this.addTextField}
                            style={{ width:"100%", marginTop:"20px", marginBottom:"20px"}}
                          >
                            <p>
                            <Add/>
                            &nbsp; Add Achievement</p>
                          </Button> */}


                          <Button 
                          
                          size="large"
                          onClick={this.addTextField}
                          style={{
                              width:"100%",
                              borderRadius: "3px",
                              letterSpacing: "1.5px",
                              marginBottom: "20px",
                              marginTop: "20px"
                            }}>
                                
                            <Add/>
                            &nbsp; Add Achievement
                          </Button>

                          </Tooltip>



                        <br></br>
                        <br></br>
                        <h6>  <b>Competitive Programming </b></h6>

                          <div className="field">
                          <img style={{width:"60px"}}src={CC} alt="Techmate" />
                          <TextField
                            variant="outlined"
                            label="Codechef Link"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.codechef}
                            id="codechef"
                            type="text"
                            style={{width: "70%", marginLeft:"10%"}}
                          />
                        </div>
                        <div className="field">
                        <img style={{width:"60px"}}src={CF} alt="Techmate" />
                          <TextField
                            variant="outlined"
                            label="Codeforces Link"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.codeforces}
                            id="codeforces"
                            type="text"
                            style={{width: "70%", marginLeft:"10%"}}
                          />
                        </div>
                        <div className="field">
                          
                        <img style={{width:"60px"}}src={SPOJ} alt="Techmate" />
                          <TextField
                            variant="outlined"
                            label="Spoj Link"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.spoj}
                            id="spoj"
                            type="text"
                            style={{width: "70%", marginLeft:"10%"}}
                          />
                        
                        </div>
                      
                        <br></br>
                        <h6>  <b>Development Profile</b></h6>

                        <div className="field">
                          <GitHub style={{ fontSize: 60 }}/>
                          <TextField
                            variant="outlined"
                            label="Gihtub Link"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.github}
                            id="github"
                            type="text"
                            style={{width: "70%", marginLeft:"10%"}}
                          />
                        </div>

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
                          <Snackbar style={{width: "100%"}}open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="success">
                              Information updated Successfully
                            </Alert>
                          </Snackbar>
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
