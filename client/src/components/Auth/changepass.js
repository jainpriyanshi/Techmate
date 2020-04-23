import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatepass } from "../../actions/authActions";
import classnames from "classnames";
import queryString from 'query-string';
import { TextField } from '@material-ui/core';
import { VpnKey} from '@material-ui/icons';
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

class Changepass extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
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
    let params = queryString.parse(this.props.location.search);
    console.log(params);
    const newUser = {
      otp: params.otp,
      email: params.email,
      password: this.state.password
    };
    this.props.updatepass(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div style={sectionStyle}>
      <div class="container outer col-lg-7" style={{float: "right"}}>
      <div  class="inner">
      <h3 variant='h5'> <VpnKey style={{ fontSize: 50 }}/> <b>Change Password </b></h3>
        <form noValidate onSubmit={this.onSubmit} style={{ margin: "30px 30px "  }}>
          <span className="text-danger">
            {errors.password}
          </span>
          <div className="field">
            <TextField
              required
              variant="outlined"
              label=" New Password"
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
          <button type="button" 
            class="btn btn-primary btn-lg btn-block card-1" 
            type="submit" 
            style={{
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
              }
          }>
          Verify
          </button>
          <br/>
          <br />
          <p className="text-secondary">
            Already Verified? <Link to="/login">Login</Link>
          </p>
          </form>
        </div>
      </div>
    </div>
    );
  }
}
Changepass.propTypes = {
  updatepass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updatepass }
)(withRouter(Changepass));
