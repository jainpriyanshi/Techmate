import React, { Component } from 'react'
import {Link} from "react-router-dom"; 
import AppBar from '@material-ui/core/AppBar';
import './footer1.css'
import CountUp from "react-countup"
import axios from "axios"

class Footer extends Component {
  constructor() {
    super();
    this.state = {
        cnt: 0
    }
} 
componentDidMount() {
    axios.get("/users/count")
    .then(res => {
        this.setState({cnt: res.data.cnt})
    })
}    
 render(){
  return (
      <div style={{marginBottom:"0%"}}>
       <AppBar position="static" style={{ backgroundColor:"black",width:"100%", align:"left" , float: "down",marginBotton:"0%"}} >
           <div style={{marginTop:"2%"}}></div>
            <div class="container">
           <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">
              TechMate is a budding <strong> community of girls pursuing Computer Science. </strong> 
              We aim to bring together girls from colleges all over the world ,to share experiences ,
              collaborate on projects , mentor others and find support that is scarce for us.
               We Also provide a common forum where you can discuss your queries. Support us , Be part 
               of our initiative by representing your college. <Link to ="/help"> Represent your college</Link>
            </p>
          </div>
          <div class="col-xs-6 col-md-3">
          </div>
          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><Link to ="/">Home</Link></li>
              <li><Link to ="/forum">Forum</Link></li>
              <li><Link to ="/team">Team</Link></li>
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
          <div class="col-md-12 col-sm-6 col-xs-12">
            <p class="copyright-text" style={{float: "left"}}>Copyright &copy; 2020 All Rights Reserved by 
         <Link to="/"> TechMate</Link>.
            </p>
            <p style={{float: "right"}}>
              <strong> total visits:  <CountUp end={this.state.cnt} duration={5} /> </strong>
            </p>
          </div>
         

         
        </div>
      </div>
        </AppBar>
        </div>
  );}
}

export default Footer;