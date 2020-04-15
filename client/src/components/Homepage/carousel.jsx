import React, { Component } from "react";

import Images1 from '../Images/c1.jpg';
import Images2 from '../Images/c2.jpg';
import Images3 from '../Images/c3.jpg';
import './Mentorship.css'

export default class carousel extends Component {
  render() {
    return (
      <div class= "col-lg-12 mb-4">
      <div class = " mt-1 text-center position-relative" >
        <div class="slide"  data-ride="carousel" >
          <div class="carousel-inner center">
            <div class="carousel-item active " data-interval="2000">
              <img src={Images1} class="d-block display-flex w-100" alt="" />
              {/* <div class="carousel-caption"  style={{ color: "black"}}>
                <h3>Mentorship</h3>
              </div> */}
            </div>
            <div class="carousel-item" data-interval="2000">
              <img src={Images2} class="d-block  display-flex w-100" alt=""  />
              {/* <div class="carousel-caption"  style={{ color: "black" }}>
                <h3>Mentorship</h3>
              </div> */}
            </div>
            <div class="carousel-item" data-interval="2000">
              <img src={Images3} class="d-block display-flex w-100" alt=""  />
              {/* <div class="carousel-caption" style={{ color: "black"}}>
                <h3>Mentorship</h3>
              </div> */}
            </div>
          </div>

        </div>
      </div>

      <div class="main-text hidden-xs">
                <div class="col-md-12 text-center">
                    <h1>
                        Static Headline And Content</h1>
                    <h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </h3>
                    
                </div>
            </div>
    </div>
    )
  }
}