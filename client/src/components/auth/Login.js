import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';



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
            <br></br>
        <br></br>
            <div class="container">
                <div class="row">
                <div class="col-md-6 col-sm-12 my">
                   
                    </div>
                    <div class="col-md-5 col-sm-12">
                      
                    <Box width ="100%" height="100%"  item xs={12} sm={8} md={5} component={Paper} elevation={6} className="card" >
                    
                    
                      <div class="conainer">
                    <div >
                    <h4 style={{ margin: "50px 50px "}}>
                    <b>Sign In</b>
                    </h4>
                    </div>
                      <form noValidate onSubmit={this.onSubmit} style={{ margin: "30px 30px "  }}>
                        <div className="input-field col s12">
                          <input
                          onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email}
                          id="email"
                          type="email"
                          className={classnames("", {
                            invalid: errors.email || errors.emailnotfound
                          })}
                        />
                          <label htmlFor="email">Email</label>
                          <span className="red-text">
                            {errors.email}
                            {errors.emailnotfound}
                          </span>
                        </div>
                        <div className="input-field col s12">
                        <input
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password"
                          type="password"
                          className={classnames("", {
                            invalid: errors.password || errors.passwordincorrect
                          })}
                        />
                        <label htmlFor="password">Password</label>
                        <span className="red-text">
                          {errors.password}
                          {errors.passwordincorrect}
                        </span>
                      </div>
                      <br/>
                      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                          style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                          }}
                          type="submit"
                          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                          Login
                        </button>
                        <p className="grey-text text-darken-1 mt-2 mb-2">
                        Don't have an account? <Link to="/register">Register</Link>
                      </p>
                      <p className="grey-text text-darken-1 mt-2 mb-2">
                         <Link to="/generate">Forgot password</Link>
                      </p>
                      </div>
                    </form>
                    </div>
                
                    </Box>
                    </div>
                    
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