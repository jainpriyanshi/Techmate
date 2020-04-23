import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { verifyUser } from "../../actions/authActions";
import queryString from 'query-string';
import { Spinner } from 'react-spinners-css';

class Verify extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
      email: "",
      errors: {}
    };
  }
  componentDidMount() {
    
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/project");
    }
    let params = queryString.parse(this.props.location.search);
    const newUser = {
      otp: params.otp,
      email: params.email,
    };
    this.props.verifyUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  render() {
    return (
      <div class="center">
        <h1 style={{marginTop: "20%" , marginBottom: "20%"}}>Please  <Spinner /> wait.. .</h1>   
      </div>
    );
  }
}

Verify.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { verifyUser }
)(withRouter(Verify));
