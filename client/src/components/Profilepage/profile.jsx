import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Container from '@material-ui/core/Container';
import Typography from  '@material-ui/core/Typography';
import hello from '../Images/cc.jpg';
import avatar from '../Images/avatar.jpg';
import Paper from '@material-ui/core/Paper';
import GitHubIcon from '@material-ui/icons/GitHub';
import Images4 from '../Images/c4.jpeg';
import ParticlesBg from "particles-bg";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '60vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  
});

function ProductCategories(props) {
    
    
  const { classes } = props;

  const images = [
    {
      url: hello,
      title: '</>',
      width: '100%',
    },
  ];
  const Profile =[
   
    {
      name: 'Parul Jain',
      description : 'Hey , I am a Sophomore at IIT Jodhpur',
      url: avatar,
      mail: "mailto:jain.26@iitj.ac.in",
      github: "https://github.com/jparul26",
      linkidin: "https://www.linkedin.com/in/parul-jain-2b958a17b/",
      intro :'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      skill1:"lorem ipssum",
       skill2:"lorem ipssum",
        skill3:"lorem ipssum"

    },
    
  ]
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
    }

  return (
    <Container className={classes.root} component="section" >
      <div className={classes.images}>

        {images.map((image) => (
          <div
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h1"
                variant="h1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
               
              </Typography>
            </div>
          </div>
        ))}
    </div>
    <div style={{marginTop: "20px"}} >
     <div class="bgrd">
              <ParticlesBg  type="custom" config={config} bg={true} />
          </div>

       <h1 style={{fontFamily: "Roboto"  , color: "teal" , textAlign : "center", marginTop: "10px", marginBottom: "10px"}} >  </h1> 
        <div class="avatar" style={{width:"300px",marginLeft:"35%",opacity:"500"}}>
                <img src={Images4} alt="Circle Image"  class="img-raised rounded-circle img-fluid"style={{marginTop:"40px"}}/>
              
       <div class="row mx-auto " >
          <div class="bgrd">
              <ParticlesBg  type="custom" config={config} bg={true} />
          </div>
          
          {Profile.map((t) => (
          
           
           <div >
                 <h2 style={{marginTop:"50px", fontFamily: "Roboto",marginLeft: "50px"}}> {t.name} </h2>
                  <p style={{marginLeft: "20px"}}>{t.description}</p>
                  
                  <a href={t.linkidin} >
                    <LinkedInIcon style={{ color: "black",marginLeft: "50px" }}/>
                  </a>
                  <a href={t.github} style ={{marginLeft: "10px"}} >
                    <GitHubIcon style={{ color: "black" }}/>
                  </a>
                  <a href={t.mail} style ={{marginLeft: "10px"}} >
                    <MailIcon style={{ color: "black" }}/>
                  </a>
                 
                 
                 
            </div>
           
           
      
           
        ))} 
          
        
        </div>

         <div >
      
           <div class="bgrd">
              <ParticlesBg  type="custom" config={config} bg={true} />
          </div>
          {Profile.map((t) => (
          
           
           <div style={{marginTop:"50px", fontFamily: "Roboto",marginLeft:"-400px",fontSize:"15px",color:"grey",marginRight:"-400px"}}  >
                
                   <p  > {t.intro} </p>  
            </div>
            
        ))} 
        </div>
         <div >
          
          
          {Profile.map((t) => (
           <div  >
                <Paper>
                <b style={{marginLeft:"15px",fontFamily: "Roboto",fontSize:"20px"}}>Skills and Endorsement:</b>
                   <p style={{marginLeft:"15px",marginTop:"20px"}} > 1.{t.skill1} </p>  
                    <p style={{marginLeft:"15px"}} >2.{t.skill2} </p>  
                     <p style={{marginLeft:"15px"}} > 3.{t.skill3} </p> 

                     </Paper> 
            </div>
            
        ))} 
        </div>
    
     </div>
</div> 
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

    </Container>

  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);