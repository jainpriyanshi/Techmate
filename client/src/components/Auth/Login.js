import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import { Typography,  TextField } from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';
import './Auth.css';
import ParticlesBg from "particles-bg";

  class Login extends Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: "",
        errors: {}
      };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
    
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
        const userData = {
          email: this.state.email,
          password: this.state.password
        };
        this.props.loginUser(userData);
      };


      render() {
        const { errors } = this.state;
        return (

        <div>
          <ParticlesBg color="#050d45"  num={90} type="cobweb" bg={true}   position="absolute" />
          <div class="container outer">
            
             
                <div  class="inner">
                < h3> <AccountCircle  style={{ fontSize: 50 }}/> <b>Login </b></h3>
                
                
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

                        <div className="field">
                        <TextField
                          required
                          variant="outlined"
                          label="Password"
                          fullWidth
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password"
                          type="password"
                          className={classnames("", {
                            invalid: errors.password || errors.passwordincorrect
                          })}
                        />
                      
                       

                      </div>
                   
                        <button type="button" class="btn btn-primary btn-lg btn-block card-1" type="submit" style={{
                            
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                            


                          }}>Login</button>
                            <br></br>
                            <br></br>

                        <p className="text-secondary">
                        Don't have an account? <Link to="/register">Register</Link>
                      </p>
                      <p className="text-secondary">
                         <Link to="/generate">Forgot password</Link>
                      </p>
  
                    </form>
                </div>
                  
              
                
          </div>
        </div>



      );
    
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);