import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"; 
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Divider, Drawer, Fab , TextField, Avatar , Card } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


function searchingfor(searchstring) {
  return function (x) {
      return x.name.toLowerCase().includes(searchstring.toLowerCase()) || !searchstring;
  }
}

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  state = {
    right: false,
    searchstring: "",
    Data: []
  }
  componentDidMount() { 
    axios.get('/users/getdata')
    .then((response) => {
        this.setState({Data: response.data})
    });
  }
  toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ [side]: open });
  };
  onSearchInputChange = (event) => {
    console.log("Search changed ..." + event.target.value)
    if (event.target.value) {
        this.setState({ searchstring: event.target.value })
    } else {
        this.setState({ searchstring: '' })
    }
  }
  sideList = side => (
       <div style={{float: "right"}} >
         <Avatar style={{float: "right"}}>
         <ArrowBackIosIcon style={{float: "right"}}onClick={this.toggleDrawer(side, false)} />
         </Avatar>
       
        <TextField
          variant="outlined"
          label="Search User"
          fullWidth
          onChange={this.onSearchInputChange}
          value={this.state.searchstring}
          id="searchInput"
          type="text"
        />
        <br/>
        <br />
        {this.state.Data.filter(searchingfor(this.state.searchstring)).map(user => (
          <div>
            <Link to = {`/profile/${user._id}`}>
            <Card  >
              <Avatar style={{float: "left" , marginTop: "10px" , marginLeft: "3px"}} />
              <div style={{ float: "left" , marginTop: "3px" }}>
               <b style={{marginLeft: "30px" }}> {user.name} </b> 
               <p style={{marginLeft: "30px", color: "grey"}}> {user.college }</p>
              </div>
            </Card>
            </Link>
            <br />
            </div>
        ))}
    </div>
  );
  render() {
  return (
    <div  >
       <AppBar  style={{backgroundColor:"white",width:"100%"}}>
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
          <Fab  style={{
              float: "right"
            }}
            onClick={this.toggleDrawer('right', true)}><SearchIcon /></Fab>
          <Drawer
            variant="persistent"  
            open={this.state.right}
            onClose={this.toggleDrawer('right', false)}
            onOpen={this.toggleDrawer('right', true)}
            style={{
              float: "right"
            }}
          >
          {this.sideList('right')}
          </Drawer>
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