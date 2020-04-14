
import React, {Fragment} from 'react';
import Mentor1 from './Images/Mentor1.jpg';
import './Mentorship.css';

export const Heading= () =>{
  return (
    <Fragment>
        <h1> Carousel </h1>
        <div class="container1">
        <img src={Mentor1}/>
        <div class="center"> <h1> <b>MENTORSHIP</b></h1></div>
      </div>

    </Fragment>
  );
}

export default Heading;
