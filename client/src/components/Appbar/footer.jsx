import React from 'react';
import {Link} from "react-router-dom"; 
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { BottomNavigation } from '@material-ui/core';
import './footer1.css'

function Footer() {
  return (
   
       <AppBar position="static"style={{marginTop: "150px" , backgroundColor:"black",width:"100%", align:"left" , float: "down"}} >
           <div style={{marginTop:"2%"}}></div>
            <div class="container">
           <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">Techmate Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div class="col-xs-6 col-md-3">
          </div>
          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><Link to ="/">Home</Link></li>
              <li><Link to ="/contact">Team</Link></li>
               <li><Link to ="/register">Sign Up</Link></li>
               <li><Link to ="/project">Project</Link></li>
               <li><Link to ="/help">Help</Link></li>
            </ul>
          </div>
          </div>
          <hr/>
          </div>
          <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved by 
         <Link to="/"> TechMate</Link>.
            </p>
          </div>
         

         
        </div>
      </div>
        </AppBar>
   
  );
}

export default Footer;