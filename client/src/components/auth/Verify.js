import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { verifyUser } from "../../actions/authActions";
import classnames from "classnames";

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


class Verify extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
      email: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      otp: this.state.otp,
      email: this.state.email,
    };

    this.props.verifyUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (

      <div>
        <br></br>
        <br></br>
            <div class="container my-auto">
                <div class="row">
                <div class="col-md-6 col-sm-12">
                   
                    </div>
                    <div class="col-md-5 col-sm-12">
                      
                    <Box width ="100%" height="100%"  item xs={12} sm={8} md={5} component={Paper} elevation={6} className="card" >
                    
                    
                      <div class="conainer">
                    <div >
                    <h4 style={{ margin: "50px 50px "  }}>
                    <b>Verify</b>
                    </h4>
                    </div>
                      <form noValidate onSubmit={this.onSubmit} style={{ margin: "30px 30px "  }}>
                      <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
                        </div>
                        <div className="input-field col s12">
                        
                <input
                  onChange={this.onChange}
                  value={this.state.otp}
                  error={errors.otp}
                  id="otp"
                  type="number"
                  className={classnames("", {
                    invalid: errors.otp
                  })}
                />
                <label htmlFor="otp">Enter OTP</label>
                <span className="red-text">{errors.otp}</span>
              </div>
                      
                      <br/>
                      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                          style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                            
                          }}
                          type="submit"
                          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                          Verify
                        </button>
                        <p className="grey-text text-darken-1 mt-2 mb-2">
                        Already Verfied? <Link to="/login">Log in</Link>
                      </p>
                      </div>
                    </form>
                    </div>
                
                    </Box>
                    </div>
                    
                  </div>
            </div>   
          </div>
    );
  }
}

Verify.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { verifyUser }
)(withRouter(Verify));
