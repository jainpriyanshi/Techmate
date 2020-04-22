import React, { Component } from 'react'
import {  TextField } from '@material-ui/core';
import classnames from "classnames";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
function Abc(props) {
     return 1;
}
export default class help extends Component {
    constructor(){
        super();    
        this.state = {
            college: "",
            email1: "",
            email2: "",
            query: "",
            errors: {},
            name1: "",
            name2: "",
            open1: false,
            open2: false,
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    
    onSubmit1 = e => {
    e.preventDefault();

    const newQuery = {
        email: this.state.email2,
        name: this.state.name2, 
        query: this.state.query
    };
     axios.post("/users/query",newQuery).
     then(res => {
        this.setState({open1: true,
        email2: "",
        name2: "",
        query: "",
        errors:{}});
     })
     .catch(err => {
         this.setState({errors: err.response.data});
     })
    
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors,
            open: false,
          });
        }
      }
 
    handleClose = (event, reason) => { 
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open1: false});
        this.setState({open2: false});
      };
    
    onSubmit2 = e => {
    e.preventDefault();

    const newRepresentative = {
        email: this.state.email1,
        name: this.state.name1,
        college: this.state.college
    };
    axios.post("/users/representative",newRepresentative).
    then(res => {
       this.setState({open2: true,
        email1: "",
        name1: "",
        college:"",
        errors: {}});
    })
    .catch(err => {
        this.setState({errors: err.response.data});
    })
    };
    render() {
        const {errors} = this.state
        return (
            <div style={{ marginTop : "10px"}} class="row mx-auto">
                <div class = "col-lg-4  card inner">
                    <p> Have any query , Feel free to ask your doubt</p>
                    <form noValidate onSubmit={this.onSubmit1} >
                        <div className="field">
                            <TextField
                                required
                                label="Email"
                                fullWidth   
                                onChange={this.onChange}
                                value={this.state.email2}
                                id="email2"
                                type="email"
                                error={errors.email2}
                                className={classnames("", {
                                invalid: errors.email2
                                })}
                            />
                            <span className="text-danger">
                                {errors.email2}
                            </span> 
                        </div>
                        <div className="field">
                            <TextField
                                required
                                label="Your Query"
                                fullWidth   
                                onChange={this.onChange}
                                value={this.state.query}
                                id="query"
                                type="text"
                                error={errors.query}
                                className={classnames("", {
                                invalid: errors.query 
                                })}
                            />
                            <span className="text-danger">
                                {errors.query}
                            </span> 
                        </div>
                        <div className="field">
                            <TextField
                                required
                                label="Name"
                                fullWidth   
                                onChange={this.onChange}
                                value={this.state.name2}
                                id="name2"
                                type="text"
                                error={errors.name2}
                                className={classnames("", {
                                invalid: errors.name2 
                                })}
                            />
                            <span className="text-danger">
                                {errors.name2}
                            </span> 
                        </div>
                        <button 
                        type="button" 
                        class="btn btn-primary btn-small btn-block card-1 mx-auto" 
                        type="submit" 
                        style={{      
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        width: "70%"
                        }}>
                         Post your Query
                        </button>
                        <Snackbar style={{width: "100%"}}open={this.state.open1} autoHideDuration={4000} onClose={this.handleClose}>
                          <Alert onClose={this.handleClose} severity="success">
                             Query Posted Succesfully
                          </Alert>
                        </Snackbar>
                    </form>
                </div>
                <div class = "col-lg-4  card inner">
                    <p>Support Us, Represent you college and become part of our team </p>
                    <form noValidate onSubmit={this.onSubmit2} >
                        <div className="field">
                            <TextField
                                required
                                label="Email"
                                fullWidth   
                                onChange={this.onChange}
                                value={this.state.email1}
                                id="email1"
                                type="email"
                                error={errors.email1}
                                className={classnames("", {
                                invalid: errors.email1
                                })}
                            />
                            <span className="text-danger">
                                {errors.email1}
                            </span> 
                        </div>
                        <div className="field">
                            <TextField
                                required
                                label="College"
                                fullWidth   
                                onChange={this.onChange}
                                value={this.state.college}
                                id="college"
                                type="text"
                                error={errors.college}
                                className={classnames("", {
                                invalid: errors.college 
                                })}
                            />
                            <span className="text-danger">
                                {errors.college}
                            </span> 
                        </div>
                        <div className="field">
                            <TextField
                                required
                                label="Name"
                                fullWidth   
                                onChange={this.onChange}
                                value={this.state.name1}
                                id="name1"
                                type="text"
                                error={errors.name1}
                                className={classnames("", {
                                invalid: errors.name1 
                                })}
                            />
                            <span className="text-danger">
                                {errors.name1}
                            </span> 
                        </div>
                        <button 
                        type="button" 
                        class="btn btn-primary btn-small btn-block card-1 mx-auto" 
                        type="submit" 
                        style={{      
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        width: "70%"
                        }}>
                         Save
                    </button>
                    <Snackbar style={{width: "100%"}}open={this.state.open2} autoHideDuration={4000} onClose={this.handleClose}>
                          <Alert onClose={this.handleClose} severity="success">
                             Request Posted Succesfully
                          </Alert>
                        </Snackbar>
                    </form>
                </div>
            </div>
        )
    }
}
