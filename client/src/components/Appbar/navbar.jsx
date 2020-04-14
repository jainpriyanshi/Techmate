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
          <Link to ="/">
          <img style={{width:"50px"}}src={process.env.PUBLIC_URL + '/logo2.png'} />
         </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;