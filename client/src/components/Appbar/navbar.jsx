import React from 'react';
import {Link} from "react-router-dom"; 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{position: "relative"}} >
       <AppBar  style={{backgroundColor:"white",width:"100%", align:"left"}}>
        <Toolbar>
         <img style={{width:"8%"}}src={process.env.PUBLIC_URL + '/logo.png'} /> 
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;