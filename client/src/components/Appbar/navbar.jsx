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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from "@material-ui/icons/Menu"
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateIcon from '@material-ui/icons/Create';
import FaceIcon from '@material-ui/icons/Face';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ForumIcon from '@material-ui/icons/Forum';
import GroupIcon from '@material-ui/icons/Group';
import LockIcon from '@material-ui/icons/Lock';

function searchingfor(searchstring) {
  return function (x) {
      return x.name.toLowerCase().includes(searchstring.toLowerCase()) || !searchstring;
  }
}

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.reload(false);
  };
  state = {
    right: false,
    left: false,
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
    <div class="container" style={{width: "300px"}}>
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
        <div  onClick={this.toggleDrawer(side,false)} >
        {this.state.Data.filter(searchingfor(this.state.searchstring)).map((user)=> (
          <div>
            <Link to = {`/profile/${user._id}`}>
            <Paper elevation={4} sty                                                                                                                                                         le={{padding: "6% 7%" ,margin:"5% " }}>
              <div style={{letterSpacing:"1.5px", display: "flex"}}>
              <img style={{float:"left", width:"50px" , height: "50px", padding: "1% 1%"}}src={Woman} alt="Techmate" />
                <div>
                  <h6 style={{   marginLeft:"auto" ,marginTop: "5px", marginBottom: "0px", fontSize: "12px"}}> {user.name} </h6>
                   <p style={{color: "grey" , fontFamily: "roboto" , marginTop: "0px" , fontSize: "11px"}}> {user.college }</p>
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
  sideList1 = side => (
    <div class="container" style={{width: "200px"}} 
    onClick={this.toggleDrawer(side,false)}>
       <div class="text-dec" style={{paddingTop:"5%"}}>
        <IconButton onClick={this.toggleDrawer(side, false)} >
          <h6 style={{marginLeft: "60px"}}>Back &nbsp;<ArrowBackIosIcon  />   
          </h6>
        </IconButton>
        <hr />
        </div>
        {this.props.auth.user.id ?
          <div>
            <div style={{color: "black", fontFamily: "roboto"}}>
                   <h5>  Hey {this.props.auth.user.name} </h5>
                </div > 
                <hr />
             <List>
             <ListItem >
             <ListItemIcon> <FaceIcon/> </ListItemIcon>
               <Link to = "/myprofile" style={{color: "black", fontFamily: "roboto"}}>
                  <h5> Profile </h5>
                </Link>
              </ListItem>
             <ListItem >
             <ListItemIcon> <AssignmentIcon/> </ListItemIcon>
               <Link to = "/project" style={{color: "black", fontFamily: "roboto"}}>
                  <h5> Projects </h5>
                </Link>
              </ListItem>
              <ListItem >
                <ListItemIcon> <ForumIcon/> </ListItemIcon>
                <Link to = "/forum" style={{color: "black" , fontFamily: "roboto"}}>
                  <h5> Forum </h5>
                </Link>
              </ListItem>
              <ListItem >
              <ListItemIcon> <CreateIcon/> </ListItemIcon>
                <Link to = "/propose" style={{color: "black" , fontFamily: "roboto"}}>
                  <h5> Propose Project </h5>
                </Link>
              </ListItem>
              <ListItem >
              <ListItemIcon> <ContactSupportIcon/> </ListItemIcon>
                <Link to = "/help" style={{color: "black" , fontFamily: "roboto"}}>
                  <h5> Help </h5>
                </Link>
              </ListItem>
              <ListItem >
              <ListItemIcon> <GroupIcon/> </ListItemIcon>
                <Link to = "/team" style={{color: "black" , fontFamily: "roboto"}}>
                  <h5> Team </h5>
                </Link>
              </ListItem>
              <ListItem >
             <ListItemIcon> <ForumIcon/> </ListItemIcon>
               <Link to = "/faq" style={{color: "black", fontFamily: "roboto"}}>
                  <h5> FAQ </h5>
                </Link>
              </ListItem>
              <ListItem>
              <ListItemIcon> <LockIcon/> </ListItemIcon>
              <Link>
              <h5 style={{color: "black", fontFamily: "roboto"}} onClick= {this.onLogoutClick}>
                  Logout
              </h5>
              </Link>
              </ListItem>
             </List>
          </div>
          :
          <div>
             <List>
             <ListItem >
             <ListItemIcon> <LockOpenIcon/> </ListItemIcon>
               <Link to = "/login" style={{color: "black", fontFamily: "roboto"}}>
                  <h5> Login </h5>
                </Link>
              </ListItem>
              <ListItem >
              <ListItemIcon> <AssignmentIcon/> </ListItemIcon>
                <Link to = "/register" style={{color: "black" , fontFamily: "roboto"}}>
                  <h5> Register </h5>
                </Link>
              </ListItem>
             </List>
          </div>
        }
        
        
      </div>
  );
  render() {
  return (
    <div  >                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
       <AppBar  style={{backgroundColor:"white",width:"100%" }}>
        <Toolbar>
        <IconButton
           
           onClick={this.toggleDrawer('left', true)}> <MenuIcon />
         </IconButton>
         <Drawer
           anchor={'left'}
           variant="temporary"  
           open={this.state.left}
           onClose={this.toggleDrawer('left', false)}
           onOpen={this.toggleDrawer('left', true)}
          
         >
         {this.sideList1('left')}
         </Drawer>
          <Link to ="/">
          <img style={{width:"80px"}}src={process.env.PUBLIC_URL + '/logo4.png'} alt="Techmate" />
          </Link>
          <div style={{ marginLeft: "auto"}}>
          <IconButton
           
            onClick={this.toggleDrawer('right', true)}> <SearchIcon />
          </IconButton>

           
          
          <Drawer
            anchor={'right'}
            variant="temporary"  
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