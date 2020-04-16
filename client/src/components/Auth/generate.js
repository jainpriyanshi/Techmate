import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GenerateOtp } from "../../actions/authActions";
import classnames from "classnames";

import { Typography,  TextField } from '@material-ui/core';
import { LockOpen} from '@material-ui/icons';
import './Auth.css';
import ParticlesBg from "particles-bg";

class Generate extends Component {
  constructor() { 
    super();
    this.state = {
      email: "",
      errors: {}
    };
  }
  componentDidMount() { 
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
    };

    this.props.GenerateOtp(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
      <ParticlesBg color="#050d45"  num={90} type="cobweb" bg={true}   position="absolute" />
      <div class="container outer">
        
         
            <div  class="inner">
            <h3 variant='h5'> <LockOpen color="primary" style={{ fontSize: 50 }}/> <b>Forgot Password?
</b></h3>
         

             <form noValidate onSubmit={this.onSubmit} style={{ margin: "30px 30px "  }}>
             <span className="text-danger">
                        {errors.email}
                        {errors.emailnotfound}
                      </span>


                      <span className="text-danger">
                      {errors.password}
                      {errors.passwordincorrect}
                    </span>


                     <div className="field">
                       <TextField
                       required
                       variant="outlined"
                       label="Email"
                       fullWidth
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("", {
                        invalid: errors.email || errors.emailnotfound
                      })}
                    />
                      
                     

                    </div>

           
               
                    <button type="button" class="btn btn-primary btn-lg btn-block card-1" type="submit" style={{
                            
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                            


                          }}>Send OTP</button>
                        <br></br>
                        <br></br>

                    <p className="text-secondary">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                   <Link to="/login">Login</Link>
                  

                </form>
            </div>
              
          
            
      </div>
    </div>

    );
  }
}

Generate.propTypes = {
  GenerateOtp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { GenerateOtp }
)(withRouter(Generate));
