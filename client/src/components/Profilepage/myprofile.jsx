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
import Chip from '@material-ui/core/Chip';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import game from '../Images/game.jpg';
import blockchain from '../Images/blockchain.jpg';
import AI from '../Images/AI.jpg';
import web from '../Images/web.jpg';
import app from '../Images/app.jpg';
import competitive from '../Images/competitive.jpg';
import ml from'../Images/ml.jpeg';
import ip from '../Images/ip.jpg';
import cc from '../Images/cc.jpg';
import Moment from 'react-moment';

class profilebyid extends Component {
    constructor()
    {
      super();
      this.state = {
        users:[],
        Data:[]
    };
    }
    getStepContent(step){
      switch(step){
        case "App Development":
            return (
                <div>
                    <img src= {app} style={{height: "150px" , width: "100%" , position: "relative" }} />
                </div>
            )
        case "Web Development":
        return (
            <div>
                <img src= {web} style={{height: "150px" , width: "100%" , position: "relative" }} />
            </div>
        )
        case "Game Development":
        return (
            <div>
                <img src= {game} style={{height: "150px" , width: "100%" , position: "relative" }} />
            </div>
        )
        case "Competitive Programming":
        return (
            <div>
                <img src= {competitive} style={{height: "150px" , width: "100%" , position: "relative" }} />
            </div>
        )
        case "Machine Learning":
        return (
            <div>
                <img src= {ml} style={{height: "150px" , width: "100%" , position: "relative"}} />
            </div>
        )
        case "Cloud Computing":
        return (
            <div>
                <img src= {cc} style={{height: "150px" , width: "100%" , position: "relative"}} />
            </div>
        )
        case "Image Processing":
        return (
            <div>
                <img src= {ip} style={{height: "150px" , width: "100%" , position: "relative"}} />
            </div>
        )
        case "Blockchain":
        return (
            <div>
                <img src= {blockchain} style={{height: "150px" , width: "100%" , position: "relative"}} />
            </div>
        )
        case "Artificial Intelligence":
        return (
            <div>
                <img src= {AI} style={{height: "150px" , width: "100%", position: "relative"}} />
            </div>
        )
      }
   }
    componentDidMount(){
      axios.get('/users/getdata')
      .then((response)=>{
        this.setState({users : response.data});
      });
      axios.get('/projects/getdata')
      .then((response)=>{
        this.setState({Data : response.data});
      });
    }
    fetch_data(){
      return this.state.Data.map(data =>{
          var badgelist="";
          var badgeItems=[];
          badgelist = data.technology.split(",");
          badgeItems = badgelist.map((badge) =>
                 <Chip variant="outlined" size= "small" 
                 color="secondary" label={badge} icon={<CheckCircleOutlineIcon />}/>
                );
              var table = (
              <TableContainer>
                  <Table aria-label="customized table">
                  <TableHead>
                  <TableRow style={{backgroundColor: "black"}} >
                      <TableCell style={{color: "white"}}> Team Member </TableCell>
                      <TableCell  style={{color: "white"}} align="right"> Role </TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                      {data.team.map((row) => (
                          <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                              {row.name}
                          </TableCell>
                          <TableCell align="right">{row.role}</TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          )
          if(data.proposedid===this.props.auth.user.id)
          return(
              <div class="col-lg-4 container">
                  <div class="flip-card">
                  <div class="flip-card-inner">
                      <div class="flip-card-front">
                      <div classname="card">
                          <CardHeader
                              avatar={
                              <Avatar style={{color: "black"}}>
                              </Avatar>
                              }
                              
                              title={data.proposedby}
                          />
                          <div style={{ display: "flex"}}>
                          {this.getStepContent(data.topic)}
                          <h3 style={{position: "absolute" ,  color: "white" , margin: "53px 100px" , border: "4px solid" }}> {data.title} </h3>
                          </div>
                          <CardContent>
                               
                               <h6> Technologies </h6>
                               {badgeItems}
                               <hr />
                               <h6>Category</h6>
                               <Chip  color="primary" label={data.topic} />
                               <hr />
                               <b> Deadline : </b>
                               <Moment format="DD-MM-YY">
                                 {data.deadline} 
                              </Moment>
                          </CardContent>
                          </div>
                      </div>
                      <div class="flip-card-back">
                      <Card>
                              <Avatar style={{float: "left"}}/>
                                <Link to = {`/profile/${data.proposedid}`} style={{marginLeft: "5px", color: "blue", float: "left"}}>
                                {data.proposedby}
                                </Link>
                                {this.props.auth.user.id===data.proposedid ?
                                <Link to = {`/project/edit/${data._id}`} style={{marginLeft: "5px",color: "grey", float:"right"}} >
                                   <EditIcon />
                                </Link>: null}
                                <a href={data.github} style={{marginLeft: "5px", color: "grey", float:"right"}}>
                                    <GitHubIcon />
                                </a>
                                <a href = {`mailto:${data.contactmail}`} style={{marginLeft: "5px" , color: "grey", float:"right"}}>
                                    <MailIcon />
                                </a>
                          <CardContent>
                              <h6 style={{marginTop: "30px"}}> Idea </h6>
                              <Typography variant="body2" color="textSecondary" component="p">
                                {data.idea}
                              </Typography>
                              < hr />
                              <h6> Team </h6>
                              {table}
                          </CardContent>
                          </Card>
                      </div>
                  </div>
              </div>
              </div>
          )});
    }
   fetch_users() 
   {
    var badgelist="";
    var badgeItems=[];    
      return this.state.users.map(users =>{
        badgelist = users.skills.split(",");
        badgeItems = badgelist.map((badge) =>
          <p> {badge}</p>
        );
        if(users._id===this.props.auth.user.id)
          return (
            <Card class="col-lg-8 container">
              <div id="user-profile-2" class="user-profile" style={{marginTop:"10px"}}>
                  <h2 style={{marginBottom:"3%",textAlign:"center" , fontFamily: "roboto"}}>My Profile
                     
                  </h2>
                  <div class="tab-content no-border padding-24">
	                  <div id="home" class="tab-pane in active">
			                <div class="row">
		                    <div class="col-xs-12 col-sm-3 center">
                          <span class="profile-picture" style={{marginLeft:"2%"}}>
				                    <img class="editable img-responsive" alt=" Avatar" id="avatar2" src={P1} style={{width:"100%",height:"100%"}} ></img>  
                          </span>
                          <div class="space space-4"></div>
                          {!!(users.linkedin)?
                            <div style={{marginLeft:"2%"}}> 
                              <a href={users.linkedin} target="_blank" class="btn btn-sm btn-block btn-info ">
                                <LinkedInIcon style={{ color: "lightblue" }}/>
                                <span class="bigger-110">Linkedin</span>
                              </a>
                              </div>
                              :users.linkedin}
                            <div style={{marginLeft:"2%" , marginBottom: "5%"}}>
                              <a href={`mailto:${users.email}`} target="_blank" class="btn btn-sm btn-block btn-primary">
                                <MailIcon style={{ color: "lightred" }}/>
                                <span class="bigger-110">Send an email</span>
                              </a>
                            </div>
                          </div>
                          <div class="col-xs-12 col-sm-9">
                          <h4 class="blue">
                            <span class="middle" style={{marginLeft:"5%" , marginTop: "2%"}}>Hey There!</span>
                            <Link to ="/profile/me/update"> <EditIcon color="black"/>  </Link>
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
                                <div class="card card-block" style={{marginLeft:"5%" , marginBottom: "5%"}}>
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
               </Card>
            )});
    }
  render() {
    return (
      <div style={{ marginTop : "70px"}}>
      <span style={{marginLeft: "10px"}}>    <Link to ="/" style={{color: "grey"}}> Home </Link> / <Link to ="/myprofile"> myprofile </Link></span>
        {this.fetch_users()}
        <h2 style={{ marginTop: "20px", fontFamily: "roboto" , textAlign: "center"}} > Projects </h2>
        <hr style={{color: "teal"}}/>
        <div class="container">
          <div class="row " style={{textAlign: "center"}} >
            {this.fetch_data()}  
          </div>
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
