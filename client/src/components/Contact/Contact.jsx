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
      title: 'Contact Us',
      width: '100%',
    },
  ];
  const team =[
    {
      name: 'Priyanshi Jain',
      description : 'hey , I am a Sophomore at IIT Jodhpur',
      url: avatar,
      mail: "mailto:jain.23@iitj.ac.in",
      github: "https://github.com/jainpriyanshi",
      linkidin: "https://www.linkedin.com/in/priyanshi-jain-a3262a188"
    },
    {
      name: 'Priyanshi Jain',
      description : 'Hey , I am a Sophomore at IIT Jodhpur',
      url: avatar,
      mail: "mailto:jain.23@iitj.ac.in",
      github: "https://github.com/jainpriyanshi",
      linkidin: "https://www.linkedin.com/in/priyanshi-jain-a3262a188"
    },
    {
      name: 'Shreya Das',
      description : 'Hey there! I am a Sophomore at IIT Jodhpur',
      url: avatar,
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
       <h1 style={{fontFamily: "Roboto" , textAlign : "center" , color: "teal" ,  marginTop: "10px", marginBottom: "10px"}} class="auto center"> Our Team </h1> 
       <div class="row mx-auto center container">
       {team.map((t) => (
          <div class="flip-card col-lg-4 ">
          <div class="flip-card-inner">
            <div class="flip-card-front">
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${t.url})`,
              }}
            />
            </div>
            <div class="flip-card-back">
                 <h2 style={{marginTop:"8px", fontFamily: "Roboto"}}> {t.name} </h2>
                  <p>{t.description}</p>
                  
                  <a href={t.linkidin} >
                    <LinkedInIcon style={{ color: "black" }}/>
                  </a>
                  <a href={t.github} style ={{marginLeft: "10px"}} >
                    <GitHubIcon style={{ color: "black" }}/>
                  </a>
                  <a href={t.mail} style ={{marginLeft: "10px"}} >
                    <MailIcon style={{ color: "black" }}/>
                  </a>
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