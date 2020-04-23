import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GenerateOtp } from "../../actions/authActions";
import classnames from "classnames";
import {  TextField } from '@material-ui/core';
import { LockOpen} from '@material-ui/icons';
import './Auth.css';

var sectionStyle = {
  height: "120vh",
 background: `url(${process.env.PUBLIC_URL}/bg1.jpg)` ,
 backgroundPosition: 'center',
 backgroundSize: 'cover',
 backgroundRepeat: 'no-repeat',
 backgroundAttachment: "static",
 marginTop: "60px"
};
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
      this.props.history.push("/project");
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
      <div style={sectionStyle}>
        <div class="container outer col-lg-7" style={{float: "right"}}>
          <div  class="inner">
            <h3 variant='h5'> <LockOpen color="primary" style={{ fontSize: 40}}/> 
              <b>Forgot Password?</b>
            </h3>
            <form noValidate onSubmit={this.onSubmit} >
              <div className="field">
                <TextField
                required
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
                style={{width: "70%"}}
                />
              <span className="text-danger">
                {errors.email}
                {errors.emailnotfound}
              </span> 
            </div>
            <button 
            type="button" 
            class="btn btn-primary btn-small btn-block card-1 mx-auto" 
            type="submit" 
            style={{      
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
              width: "70%"
            }}>
              Send OTP
            </button>
            <p style={{color: "grey"}}>
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
