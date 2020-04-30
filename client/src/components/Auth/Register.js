import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import {  TextField } from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';
import './Auth.css';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'
import FacebookLogin from 'react-facebook-login';
import { FacebookUserLogin } from "../../actions/authActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var sectionStyle = {
  height: "170vh",
 background: `url(${process.env.PUBLIC_URL}/bg1.jpg)` ,
 backgroundPosition: 'center',
 backgroundSize: 'cover',
 backgroundRepeat: 'no-repeat',
 backgroundAttachment: "static",
 marginTop: "60px"
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      open: false,
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
    else {
      this.setState({
        errors: {},
        open: true,
      });
    }
  }

  responseFacebook = (response) => {
    console.log(response);
    const userData = {
      email: response.email,
      password: response.id,
      name: response.name
    };
    this.props.FacebookUserLogin(userData,this.props.history);
  }
  
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false});
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    console.log(newUser);
  };

  render() {
    const { errors } = this.state;
    return (
      <div style={sectionStyle}>
        <div class="container outer col-lg-7" style={{float: "right"}}>
            <div  class="inner">
            <h3> <AccountCircle  style={{ fontSize: 50 }}/> <b>Register </b></h3>
              <br></br>
                <form noValidate onSubmit={this.onSubmit} style={{ margin: "10px 10px "  }}>
                  <div className="field">
                  <TextField
                    required
                    variant="outlined"
                    label="Name"
                    fullWidth
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("", {
                      invalid: errors.name
                    })}
                />
                <span className="text-danger">{errors.name}</span>
                  </div>
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
                    invalid: errors.email
                  })}
                />
                <span className="text-danger">{errors.email}</span>
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
                    invalid: errors.password
                  })}
                />
                
                <span className="text-danger">{errors.password}</span>
                </div>
           
                <div className="field">
                <TextField
                  required
                  variant="outlined"
                  label="Re-enter Password"
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
              <span className="text-danger">{errors.password2}</span>
            </div>
            <button type="button" class="btn btn-primary btn-lg btn-block card-1" type="submit" style={{                            
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}>Register</button>
              <div style={{marginTop: "1rem" , backgroundColor: "#3b5998" , textColor: "white"}}>
                <FacebookLogin
                appId="1639297312884139"
                autoLoad={false}
                fields="name,email"
                callback={this.responseFacebook}
                cssClass="btn btn-lg btn-fb btn-block "
              />
              </div>
              <br></br>
            <p className="text-secondary">
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <p className="text-secondary">
                <Link to="/generate">Forgot password</Link>
            </p>
          </form>
          <Snackbar style={{width: "100%"}}open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="success">
               A verification link has been sent to your registered email.
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>        
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  FacebookUserLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, FacebookUserLogin }
)(withRouter(Register));
