import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios"
import P1 from'../Images/p1.png';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './profile.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import Code from '@material-ui/icons/Person';
import C from '@material-ui/icons/CheckBox';
import Card from '@material-ui/core/Card'
import EditIcon from "@material-ui/icons/Edit"

class profilebyid extends Component {
    constructor()
    {
        super();
        this.state = {
           users:[]
    };
    }
    componentDidMount(){
        console.log("hey");
        axios.get('/users/getdata')
        .then((response)=>{
            console.log(response.data)
            this.setState({users : response.data});
        });
    }
   fetch_users() 
   {
        var badgelist="";
            var badgeItems=[];
            
        return this.state.users.map(users =>{

              badgelist = users.skills.split(",");
                badgeItems = badgelist.map((badge) =>
                  <p > {badge}</p>
                );
            if(users._id===this.props.auth.user.id)
            return (
              <Card class="col-lg-8 container">
               <div >
                
                  <div id="user-profile-2" class="user-profile" style={{marginTop:"100px"}}>
                    <div>
                       <h2 style={{marginTop:"10%",textAlign:"center"}}>My Profile
                       <Link to ="/profile/me/update"> <EditIcon color="black"/>  </Link></h2>
                    
                    </div>
                    
                   <div class="tab-content no-border padding-24">
	             <div id="home" class="tab-pane in active">
			 <div class="row">
		           <div class="col-xs-12 col-sm-3 center">
                               <span class="profile-picture" style={{marginLeft:"2%"}}>
				 <img class="editable img-responsive" alt=" Avatar" id="avatar2" src={P1} style={{width:"100%",height:"100%"}} ></img>  
                               </span>
                               <div class="space space-4"></div>
                                   {!!(users.linkedin)?
                                     <div style={{marginLeft:"5%"}}> 
                                       <a href={users.linkedin} target="_blank" class="btn btn-sm btn-block btn-info ">
                                          <LinkedInIcon style={{ color: "lightblue" }}/>
					   <span class="bigger-110">Linkedin</span>
				      </a>
                                    </div>:users.linkedin}
                                    <div style={{marginLeft:"5%"}}>
				      <a href={`mailto:${users.email}`} target="_blank" class="btn btn-sm btn-block btn-primary">
                                         <MailIcon style={{ color: "lightred" }}/>
	                                 <span class="bigger-110">Send an email</span>
		                     </a>
                                    </div>
                               </div>
                              <div class="col-xs-12 col-sm-9">
                                <h4 class="blue">
			          <span class="middle" style={{marginLeft:"5%"}}>Hey There!</span>
		                </h4>
                                <div class="profile-user-info">
			           <div class="profile-info-row">
                                     <div class="profile-info-name"> Username: </div>
                                        <div class="profile-info-value">
                                           <span>{users.name}</span>
				      </div> 
                                  </div>
                                    <div class="profile-info-row">
                                       <div class="profile-info-name"> Institute: </div>
                                           <div class="profile-info-value">
                                               <span>{users.college}</span>
	                                  </div> 
                                     </div>
                                     <div class="profile-info-row">
                                       <div class="profile-info-name"> Degree: </div>
                                       <div class="profile-info-value">
                                         <span>{users.degree}</span>
		                       </div> 
                                   </div>
                                   {!!(users.codechef)? 
                                 <div class="profile-info-row">
				    <div class="profile-info-name">
                                      <Code style={{ color: "lightred" }}/>
				   </div>

				  <div class="profile-info-value">
		                    <a href={users.codechef} target="_blank">Find me on Codechef</a>
				 </div>
				</div>:users.codechef}
                                {!!(users.codeforces)?  
                                 <div class="profile-info-row">
				   <div class="profile-info-name">
                                      <Code style={{ color: "lightred" }}/>
				   </div>

		                  <div class="profile-info-value">
				    <a href={users.codeforces} target="_blank">Find me on Codeforces</a>
		                  </div>
		                </div>:users.codeforces}
                                {!!(users.spoj)?  
                              <div class="profile-info-row">
			         <div class="profile-info-name">
                                    <Code style={{ color: "lightred" }}/>
		                 </div>

		                <div class="profile-info-value">
				  <a href={users.spoj} target="_blank">Find me on Spoj</a>
		               </div>
                            </div>:users.spoj}
                              {!!(users.github)?  
                             <div class="profile-info-row">
				<div class="profile-info-name">
                                   <GitHubIcon style={{ color: "lightred" }}/>
				</div>
                                <div class="profile-info-value">
				 <a href={users.github} target="_blank">Find me on Github</a>
				</div>
	                     </div>:users.github}
                           </div> 
                          </div>   
                        </div>
                        <div class="space-20"></div>
                        <div class="row" style={{marginTop:"15px"}}>
			   <div class="col-xs-12 col-sm-6">
			     <div class="widget-box transparent">
		               <div class="widget-header widget-header-small" style={{marginLeft:"5%"}}>
                               <h4 class="widget-title smaller">
                                <C style={{ color: "black" }}/>
			         Little About Me
			      </h4>
                             </div>
                             <div class="widget-body">
			       <div class="widget-main" style={{marginLeft:"5%"}}>
                                {!!(users.bio)?<p>{users.bio}</p>:users.bio}
                              </div>
                            </div>  
                            <div class="row" style={{marginTop:"15px"}}>
                              <div class="col-sm-12">
                                 <div class="card card-block text-xs-left" style={{marginLeft:"5%"}}>
                                    <h5  style={{color:"teal",marginTop:"10px"}}> <C style={{ color: "teal" }}/>Skills & Endorsement:</h5>
                                    <p style={{marginLeft:"20px",fontSize:"18px"}}>{badgeItems}</p>
                                 </div>
                              </div>
                            </div> 
                            <div class="row" style={{marginTop:"15px",marginBottom:"10px"}}>
                              <div class="col-sm-12">
                                <div class="card card-block" style={{marginLeft:"5%"}}>
                                  <h5 style={{color:"teal",marginTop:"10px"}}>  <C style={{ color: "teal" }}/> Achievements:</h5>
            
                                      {users.achievement.map((achievement,index)=>(
                                          achievement!== null?<p style={{marginLeft:"20px",fontSize:"18px"}}>{achievement}</p>
                                      :null
                                      ))}
                                </div>
                              </div>
                            </div>     
                          </div>
                         </div>
                      </div>               
                   </div>
                  </div>
                 </div>
                 
               </div>
               </Card>
        
            
            )});
    }
    render() {
        return (
          <div>
          
           
            <div>
                {this.fetch_users()}
            </div>
           
            </div>
        )
    }
    }


profilebyid.propTypes={
    auth:PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
  });
  
  export default connect(
    mapStateToProps
  )(profilebyid);
