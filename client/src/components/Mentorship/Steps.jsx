import React from 'react';
import Fade from 'react-reveal/Fade';
import './Mentorship.css'
import user from './Images/user.png'
import meet from './Images/meet.png'
import data from './Images/data.png'
import cup from './Images/cup.png'
import Typography from '@material-ui/core/Typography';
import Zoom from 'react-reveal/Zoom';
class Steps extends React.Component {
  render() {
    return (
      <div class="container content" >
   

    <div class="step">
      <Zoom>
      <div class="center"> <h1> <b>STEPS TO SEEK MENTORSHIP</b></h1></div>
      <hr></hr>
      </Zoom>
    </div>
    

    <div class=" step">
    <img src={user} class="icon "/>
      <Fade left>
          <h1> Sign Up</h1>
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis iure molestias nam rerum fuga, nostrum error magni harum dolorem labore commodi! Quasi, repudiandae? Perferendis veniam voluptates error vero voluptate tenetur!</p>
         
        </Fade>
        </div>
        <div class="gap"></div>
        <div class=" step">
        <img src={meet} class="icon "/>
        <Fade right>
           
          <h1>Meet Mentors</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis iure molestias nam rerum fuga, nostrum error magni harum dolorem labore commodi! Quasi, repudiandae? Perferendis veniam voluptates error vero voluptate tenetur!</p>
         
        </Fade>
        </div>
        <div class="gap"></div>
        <div class=" step">
        <img src={data} class="icon "/>
        <Fade left>
            
          <h1>Code</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis iure molestias nam rerum fuga, nostrum error magni harum dolorem labore commodi! Quasi, repudiandae? Perferendis veniam voluptates error vero voluptate tenetur!</p>
         
        </Fade>
        </div>
        <div class="gap"></div>
        <div class=" step">
        <img src={cup} class="icon "/>
        <Fade right>
            
          <h1>Excel</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis iure molestias nam rerum fuga, nostrum error magni harum dolorem labore commodi! Quasi, repudiandae? Perferendis veniam voluptates error vero voluptate tenetur!</p>
         
        </Fade>
        </div>
      </div>
    );
  }
}

export default Steps;