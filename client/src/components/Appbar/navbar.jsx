import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"; 
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Divider, Drawer, Fab , TextField, Avatar , Paper, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Search from '../Images/search.png'
import Woman from '../Images/woman.png'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


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
    <div class="container">
       <div class="text-dec" style={{paddingTop:"5%"}}>
        <IconButton onClick={this.toggleDrawer(side, false)} >
          <h6>Back &nbsp;<ArrowForwardIosIcon  />   
          </h6>
        </IconButton>
        </div>
        <hr />
        <div style={{   paddingTop:"2px", textAlign: "center"}}>
        
          <TextField
            label="Search User"
            fullWidth
            onChange={this.onSearchInputChange}
            value={this.state.searchstring}
            id="searchInput"
            type="text"
          style={{width: "70%", marginLeft:"10%"}}
        />
         <img style={{width:"24px", marginTop: "12px", marginBottom: "10px"}}src={Search} alt="Techmate" />
        </div>
        <hr/>
        <div style={{letterSpacing:"3.5px" ,textAlign:"center"}}>
        <h6 style={{fontFamily: "roboto"}}>  <b>TOP RESULTS </b></h6>
        </div>
        <div>
        {this.state.Data.filter(searchingfor(this.state.searchstring)).map((user)=> (
          <div>
            <Link to = {`/profile/${user._id}`}>
            <Paper elevation={4} sty                                                                                                                                                         le={{padding: "6% 7%" ,margin:"5% " }}>
              <div style={{letterSpacing:"1.5px", display: "flex"}}>
              <img style={{float:"left", width:"50px" , height: "50px", padding: "1% 1%"}}src={Woman} alt="Techmate" />
                <div>
                  <h6 style={{ float:"left",  marginLeft:"auto" ,marginTop: "5px",  marginBottom: "0px"}}> {user.name} </h6>
                   <p style={{color: "grey" , fontFamily: "roboto" , marginTop: "0px"}}> {user.college }</p>
                </div>
               </div>
            </Paper>
            </Link>
            <br />
            </div>
        ))}
      </div>
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
          <div style={{ marginLeft: "auto"}}>
          
          <button
            style={{
                borderRadius: "3px",
                letterSpacing: "2px"
                }}
              onClick={this.onLogoutClick}
              class="btn btn-lg">
          
            Logout
          </button>

          <IconButton
           
            onClick={this.toggleDrawer('right', true)}> <SearchIcon />
          </IconButton>

           
          
          <Drawer
            anchor={'right'}
            variant="persistent"  
            open={this.state.right}
            onClose={this.toggleDrawer('right', false)}
            onOpen={this.toggleDrawer('right', true)}
           
          >
          {this.sideList('right')}
          </Drawer>
          </div>
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