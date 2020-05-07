import React from 'react';
import PropTypes from 'prop-types';
import Images1 from '../Images/woman.png';



function ProductCategories(props) {
  const { classes } = props;

 
  const representative =[
    {
      name: 'Prerna Singh',
      college:'NIT Jamshedpur'
    },
    {
        name: 'Anjali Kumari',
        college:'Jaypee Institute of Information Technology'
    },
    {
        name: 'Anjali Deep',
        college:'IIT MANDI'
    },
  ]

  return (
   
    <div style={{marginTop:"5rem"}} >
         <div>
             <h2 style={{textAlign:"center",color:"TEAL"}}> Our Representative</h2>
         </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" style={{marginLeft:"5%",marginRight:"5%",marginTop:"3rem"}}>
        {representative.map((r) => (
          <div class="container">  
           <div class="col mb-4">
           <div class="card">
             <div class="card bg-light">
                <div class="avatar">
                  <img src={Images1} class="card-img-top" style={{height:"50%",width:"50%",marginLeft:"25%",marginTop:"10%"}}/>
                </div>
                <div class="card-body">
                  <h6 class="card-title" style={{textAlign:"center",fontFamily: "Roboto" }}>Name: {r.name}</h6>
                 <h6 class="card-title" style={{textAlign:"center",fontFamily: "Roboto" }}>College: {r.college}</h6>
              </div>
           </div>
         </div>
       </div>
       </div>
      ))} 
    </div>
</div>   
    

  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default(ProductCategories);