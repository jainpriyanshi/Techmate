import React, { Component } from 'react'
import './projectlist.css';
import img from "../Images/cc.jpg";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import axios from 'axios';
import {Link} from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid'

export default class Projectlist extends Component {
    state = {
        right: false,
        searchstring: "",
        Data: []
      }
      componentDidMount() { 
        axios.get('/projects/getdata')
        .then((response) => {
            this.setState({Data: response.data})
            console.log(response.data);
        });
        console.log(this.state);
      }
      fetch_data(){
        return this.state.Data.map(data =>{
            var badgelist="";
            var badgeItems=[];
            badgelist = data.technology.split(",");
            badgeItems = badgelist.map((badge) =>
                   <Chip variant="outlined" color="info.main" label={badge} icon={<CheckCircleOutlineIcon />}/>
                  );
            var table = (
                <TableContainer>
                    <Table aria-label="customized table">
                    <TableHead>
                    <TableRow style={{backgroundColor: "black"}}>
                        <TableCell style={{color: "white"}}> Team Member </TableCell>
                        <TableCell  style={{color: "white"}} align="right"> Role </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.team.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            return(
                <div>
                    <div class="flip-card col-lg-4 col-sm-12" style={{float: "left"}}>
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <Card classname="card">
                            <CardHeader
                                avatar={
                                <Avatar style={{color: "black"}}>
                                </Avatar>
                                }
                                title={data.proposedby}
                            />
                                
                            <img src= {img} style={{height: "200px" , width: "100%"}} />
                            <CardContent>
                                 <h3 style={{color: "teal" , fontFamily: "roboto"}}> {data.title} </h3>
                                 <hr />
                                 <h6> Technologies </h6>
                                 {badgeItems}
                                 <hr />
                                 <h6>Category</h6>
                                 <Chip  color="green" label={data.topic} />
                                 <hr />
                                 <Chip  style={{backgroundColor: "green"}} label={data.deadline} />
                            </CardContent>
                            </Card>
                        </div>
                        <div class="flip-card-back">
                        <Card>
                                <Avatar >
                                </Avatar>
                                  <Link to = {`/profile/${data.proposedid}`} style={{marginLeft: "5px"}}>
                                  {data.proposedby}
                                  </Link>
                                  <a href={data.github} style={{marginLeft: "5px"}}>
                                      <GitHubIcon />
                                  </a>
                                  <a href = {`mailto:${data.contactmail}`} style={{marginLeft: "5px"}}>
                                      <MailIcon />
                                  </a>
                            <CardContent>
                            
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {data.idea}
                                </Typography>
                                {table}
                            </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                </div>
            )});
      }
    render() {
        return (
            <div style={{marginTop: "100px"}} class="container" >
                
                    {this.fetch_data()}
                
            </div>
        )
    }
}
