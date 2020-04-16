import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
  return (
    <div style={{position: "relative"}} >
       <AppBar  style={{backgroundColor:"white",width:"100%", align:"left"}}>
        <Toolbar>
          <Link to ="/">
          <img style={{width:"50px"}}src={process.env.PUBLIC_URL + '/logo2.png'} alt="Techmate" />
         </Link>
         <button
          style={{
                marginLeft: "5px",
                borderRadius: "3px"
                }}
              onClick={this.onLogoutClick}
              class="btn btn-primary">
          >
          Logout
          </button>
        </Toolbar>
      </AppBar>
    </div>
  );
}}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);