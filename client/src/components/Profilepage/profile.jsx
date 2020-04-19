import React, { Component } from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom"; 
import { connect } from "react-redux";
import axios from "axios"
import Container from '@material-ui/core/Container';
import Card from'@material-ui/core/Card';
import ParticlesBg from "particles-bg";
import P1 from'../Images/p1.png';
import P2 from'../Images/p2.png';
import P3 from'../Images/p3.jpg';
import P4 from'../Images/cup.png';
import college from'../Images/college.png';
import L from '../Images/contact.png';
import CUP from '../Images/skills.jpg';





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
               
               <div>
                     <p style={{color:"grey",fontSize:"100px",marginTop:"50px",textAlign:"center"}}>Profile</p>
                   </div>
                 <div>
                    <div style={{float:"left"}}>
                         <img src={P1} style={{height:"450px" ,width:"450px",marginTop:"50px",marginLeft:"150px"}}/> 
                    </div>
                    <div style={{float:"Right",textAlign:"center",marginRight:"90px"}}>
                    <h4 style={{marginTop:"250px",color:"grey"}}>Hey There!</h4>
                    <h1 style={{marginTop:"10px",fontSize:"75px"}}><b>I am {users.name}</b> </h1>
                    </div>

                </div>
                <div >
                     <div style={{float:"Right",marginTop:"50px"}}>
                         <img src={P2}/>
                     </div >  
                     <div  style={{float:"left",width:"450px",marginLeft:"90px",marginTop:"70px"}}>
                     {!!(users.bio)?<div><h2>Let's Introduce About Myself</h2><p style={{marginTop:"10px",color:"grey"}}>{users.bio} </p></div>:users.bio}
                     {!!(users.college)?
                  
                    <h2 > Institute:  {users.college} </h2> 
                     :users.college}
                     {!!(users.degree)?<h4 style={{textAlign:"center",color:"grey",marginLeft:"-100px"}}>{users.degree}</h4>:users.degree }
                    </div>   
                </div>
               <div>
               <div style={{float:"Left"}}>
                   <img src={L} style={{height:"300px",width:"600px",marginTop:"50px",marginLeft:"20px"}}/>

               </div>
               <div style={{float:"Right"}}>
               <h4 style={{marginTop:"10px",marginRight:"100px"}}><b> Email: <a href={users.email} >{users.email}</a></b> </h4> 
               {!!(users.linkedin)?<h4 style={{marginTop:"10px",marginRight:"100px"}}><b> Linkedin: <a href={users.linkedin} >{users.linkedin}</a></b> </h4>:users.linkedin}
               {!!(users.github)?<h4 style={{marginTop:"10px",marginRight:"100px"}}><b> GitHub: <a href={users.github} >{users.github}</a></b></h4>:users.linkedin}
               {!!(users.codechef)?<h4 style={{marginTop:"10px",marginRight:"100px"}}><b> Codechef: <a href={users.codechef} >{users.codechef}</a></b> </h4>:users.codechef}
               {!!(users.codeforces)?<h4 style={{marginTop:"10px",marginRight:"100px"}}><b> codeforces: <a href={users.codeforces} >{users.codeforces}</a></b> </h4>:users.codeforces}
               {!!(users.spoj)?<h4 style={{marginTop:"10px",marginRight:"100px"}}><b> Spoj: <a href={users.spoj} >{users.spoj}</a></b> </h4>:users.spoj}
               </div>
               </div>
               <div >
               <div style={{float:"Left",marginTop:"400px",marginLeft:"-500px"}}>
                   <Card style={{height:"300px",width:"400px"}}>
                       <div style={{marginLeft:"20px"}}>
               <h4 style={{color:"blue",marginBotton:"10px",marginTop:"10px"}}><b>Skills & Endorsement: </b></h4>
                       <h5 style={{fontFamily:"Roboto",color:"grey",marginLeft:"10px"}}>   {badgeItems}
                          </h5>
                          </div>
                          </Card>
               </div>
               <div style={{float:"Left"}}>
                 <img src={CUP} style={{height:"200px",width:"200px",marginTop:"400px"}}></img>
               </div>
               <div style={{float:"Right",marginTop:"400px",marginRight:"-400px"}}>
               
                   <Card style={{height:"300px",width:"400px"}}>
                       <div style={{marginLeft:"20px"}}>
                      
               <h4 style={{color:"blue",marginBotton:"10px",marginTop:"10px"}}><b>Achievement:               </b></h4>
                      {users.achievement.map((achievement,index)=>(
                      achievement!== null?<h5 style={{fontFamily:"Roboto",color:"grey"}}> {achievement}</h5>
                      :null
                     ))}
                     </div>
                     </Card>
               </div>
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
          
           <div class="bgrd">
              <ParticlesBg  type="custom" config={config} bg={true} />
          </div>
            <div >
            <div class="bgrd">
              <ParticlesBg  type="custom" config={config} bg={true} />
          </div>
                {this.fetch_users()}
            </div>
            <div class="bgrd">
              <ParticlesBg  type="custom" config={config} bg={true} />
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