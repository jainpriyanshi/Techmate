import React from 'react';
import Fade from 'react-reveal/Fade';
import './Mentorship.css'
import user from '../Images/user.png'
import meet from '../Images/meet.png'
import data from '../Images/data.png'
import cup from '../Images/cup.png'
import Zoom from 'react-reveal/Zoom';
import ParticlesBg from "particles-bg";

class Steps extends React.Component {
  render() {
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
      color: ["random"],
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
    }
    return (
      <div class="overlay">
         <div class="bgrd">
              <ParticlesBg  type="custom" config={config} bg={true} />
          </div>
      <div class="content">
     
    <div class="step1">     
      <Zoom>
       <h1> <b>STEPS TO SEEK MENTORSHIP</b></h1>
      <hr></hr>
      </Zoom>
    </div>
    

    <div class=" step">
    <img src={user} class="icon1 "/>
      <Fade left>
          <h1> Register</h1>
          <p> Register free of cost to get access to projects, discussion forums, and mentor profiles. Complete your profile to help the community know you better.</p>
         
        </Fade>
        </div>
        <div class="gap"></div>
        <div class=" step">
        <img src={meet} class="icon1"/>
        <Fade right>
           
          <h1>Meet Mentors</h1>
          <p>Browse or propose projects in any field of your choice. Search and contact mentors or team up with members of the community with a mentor for consulting or even go solo.</p>
         
        </Fade>
        </div>
        <div class="gap"></div>
        <div class=" step">
        <img src={data} class="icon1 "/>
        <Fade left>
            
          <h1>Code</h1>
          <p>Collaborate and Code on gitHub, ask your queries on discussion forums, get in touch to your mentor and teammates through their registered email.</p>
         
        </Fade>
        </div>
        <div class="gap"></div>
        <div class=" step">
        <img src={cup} class="icon1 "/>
        <Fade right>
            
          <h1>Excel</h1>
          <p>Finish projects and improve your resume, get experience and most importantly gain a lot of knowledge from the community.</p>         
        </Fade>
        </div>
      </div>
      </div>
    );
  }
}

export default Steps;