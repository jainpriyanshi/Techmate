import React, { Component } from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom"; 
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import axios from "axios"
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Container from '@material-ui/core/Container';
import Card from'@material-ui/core/Card';
import Typography from  '@material-ui/core/Typography';
import hello from '../Images/cc.jpg';
import avatar from '../Images/avatar.jpg';
import Paper from '@material-ui/core/Paper';
import GitHubIcon from '@material-ui/icons/GitHub';
import Images4 from '../Images/c4.png';
import ParticlesBg from "particles-bg";
import Code from'@material-ui/icons/Code'
import Achievem from'@material-ui/icons/EmojiEvents';



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
            if(users._id===this.props.match.params.id)
            return (
                <div>    
               
               <div class="avatar" style={{width:"300px",marginLeft:"40%",opacity:"500"}}>
                <img src={Images4} alt="Circle Image"  class="img-raised rounded-circle img-fluid"style={{marginTop:"40px"}}/>
               </div>
               <div>
                 <h4 style={{marginTop:"50px",textAlign:"center",color:"grey"}}>Hey There!</h4>
                 <h1 style={{marginTop:"10px",textAlign:"center"}}><b>I am {users.name}</b> </h1>
                  {!!(users.college)?<p style={{marginTop:"10px",textAlign:"center",color:"grey"}}>Institute: {users.college} </p>:users.college}
                   {!!(users.degree)?<p style={{textAlign:"center",color:"grey"}}>{users.degree}</p>:users.degree }
                   {!!(users.bio)?<p style={{marginTop:"10px",color:"grey",marginLeft:"200px",marginRight:"200px",fontSize:"14px",fontFamily:"Inherit"}}>{users.bio} </p>:users.bio}
               </div>
               <div class="card container col-lg-4"  >
                   <br/>
                   <p><b> Contact : </b></p>
                   <hr/>
                    {!!(users.linkedin)?
                    <div>
                   <a href={users.linkedin} >
                    <p>LinkedIn : </p>
                    <LinkedInIcon style={{ color: "black",marginTop:"-1.5rem" }}/>
                    <p> {users.linkedin}</p>
                  </a>
                  <hr/>
                  </div>:users.linkedin
                  }
                  {!!(users.email)?
                    <div>
                   <a href={users.email} >
                    <p>Email : </p>
                    <MailIcon style={{ color: "black",marginTop:"-1.5rem" }}/>
                    <p> {users.email}</p>
                  </a>
                  <hr/>
                  </div>:users.email
                  }

               </div>
                <div style={{marginTop:"20px"}} >
                <Card class="card container col-lg-3" style={{float:"left",marginLeft:"200px"}}>
                <p><b>Achievement:               </b></p>
                      {users.achievement.map((achievement,index)=>(
                      achievement!== null?<p> {achievement}</p>:null
                     ))}

                     </Card> 

                       <Card class="card container col-lg-3" style={{float:"right",marginRight:"200px"}}>
                        <p><b>Skills: </b></p>
                       <p style={{fontFamily:"Roboto"}}>   {badgeItems}
                          </p>
                        

                     </Card> 
            </div> 
        
              </div>
      
            
        
            
            )});
    }
    render(){
    let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      alpha: [0.6, 0],
      scale: [.1, 0.4],
      position: "all",
      color: ["random", "#ff0000"],
      cross: "dead",
      // emitter: "follow",
      random: 15
    };

    if (Math.random() > 0.85) {
      config = Object.assign(config, {
        onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(
            particle.p.x,
            particle.p.y,
            particle.radius * 2,
            particle.radius * 2
          );
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
        }
      });
    } {
        return (
          <div>
          <div>
          <img src={hello} style={{width:"90%",height:"500px",marginLeft:"5%",marginRight:"5%"}}/>
          </div>
           <div class="bgrd">
              <ParticlesBg  type="custom" config={config} bg={true} />
          </div>

            <div style={{marginTop: "10px"}}>
                {this.fetch_users()}
            </div>

            </div>
        )
    }
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