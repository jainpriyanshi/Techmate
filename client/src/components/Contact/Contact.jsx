import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Container from '@material-ui/core/Container';
import Typography from  '@material-ui/core/Typography';
import hello from '../Images/hello.jpg';
import avatar from '../Images/avatar.jpg';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Contact.css';
import dev1 from "../Images/dev1.jpeg"
import dev2 from "../Images/dev2.jpg"
import dev3 from "../Images/dev3.jpg"
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
      title: 'Team',
      width: '100%',
    },
  ];
  const team =[
    {
      name: 'Priyanshi Jain',
      description : 'Hey , I am a Sophomore at IIT Jodhpur',
      url: dev1,
      mail: "mailto:jain.23@iitj.ac.in",
      github: "https://github.com/jainpriyanshi",
      linkidin: "https://www.linkedin.com/in/priyanshi-jain-a3262a188"
    },
    {
      name: 'Parul Jain',
      description : 'Hey , I am a Sophomore at IIT Jodhpur',
      url: dev2,
      mail: "mailto:jain.26@iitj.ac.in",
      github: "https://github.com/jparul26",
      linkidin: "https://www.linkedin.com/in/parul-jain-2b958a17b/"
    },
    {
      name: 'Shreya Das',
      description : 'Hey there! I am a Sophomore at IIT Jodhpur',
      url: dev3,
      mail: "mailto:das.6@iitj.ac.in",
      github: "https://github.com/shreya0505",
    },
  ]

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
       <h1 style={{fontFamily: "Roboto" , textAlign : "center" , color: "teal" ,  marginTop: "10px", marginBottom: "10px"}} > Our Team </h1> 
       <div class="row">
       {team.map((t) => (
           <div class="col-lg-4">
           <div class="card profile-card-3">
               <div class="background-block">
                   <img src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="profile-sample1" class="background"/>
               </div>
               <div class="profile-thumb-block">
                   <img src={t.url} alt="profile-image" class="profile"/>
               </div>
               <div class="card-content">
                   <h2>{t.name}<small>Developer</small> <small>{t.description}</small></h2>
                   <div class="icon-block">
                     <a href={t.github}> <GitHubIcon style={{color:"black"}}/></a>
                     <a href={t.mail}> <MailIcon style={{color:"black"}}/></a>
                     <a href={t.linkedin}> <LinkedInIcon style={{color:"black"}}/> </a>
                    </div>
                   </div>
               </div>
       </div>
        ))} 
        </div>
       

</div>    
    </Container>

  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);