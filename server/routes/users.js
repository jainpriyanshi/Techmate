const express = require("express");
const router =  express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const isEmpty = require("is-empty");
const keys = require("../config/keys");

const ValidateRegisterInput = function validateRegisterInput(data) {
    let errors = {};
    
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
   
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

const ValidateLoginInput = function validateLoginInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";// Email checks
    
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
   const ValidateOTPInput = function validateOTPInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.otp = !isEmpty(data.otp) ? data.otp : "" ;// Email checks
    
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  
    if (Validator.isEmpty(data.otp)) {
      errors.otp = "otp is required";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  const ValidateForgotInput = function validateForgotInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";

    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  const ValidateQuery = function validateQuery(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.name = !isEmpty(data.name) ? data.name: "";
    data.query = !isEmpty(data.query) ? data.query: "";
    if (Validator.isEmpty(data.email)) {
      errors.email2 = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
      errors.email2 = "Email is invalid";
    }
    if (Validator.isEmpty(data.name)) {
      errors.name2 = "Name field is required";
    } 
    if (Validator.isEmpty(data.query)) {
      errors.query = "Query field is required";
    } 
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  const ValidateRepresentative = function ValidateRepresentative(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.name = !isEmpty(data.name) ? data.name: "";
    data.college = !isEmpty(data.college) ? data.college: "";
    if (Validator.isEmpty(data.email)) {
      errors.email1 = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
      errors.email1 = "Email is invalid";
    }
    if (Validator.isEmpty(data.name)) {
      errors.name1 = "Name field is required";
    } 
    if (Validator.isEmpty(data.college)) {
      errors.college = "College field is required";
    } 
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  const ValidateChangeInput = function validateChangeInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.otp = !isEmpty(data.otp) ? data.otp : "" ;
    data.password = !isEmpty(data.otp) ? data.password : "" ;

    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  
    if (Validator.isEmpty(data.otp)) {
      errors.otp = "otp is required";
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = "password is required";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

  const Member = require ("../models/Member");
  const Count = require ("../models/Count");
  router.post("/verify", (req, res) => {
    
    const { errors, isValid } = ValidateOTPInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    var update = {isVerified: true}
    Member.findOneAndUpdate({ email: req.body.email, otp: req.body.otp },update).then(user => {
      if (!user) {
        return res.status(400).json({ email: "Email not found  or otp is incorrect" });
      } 
      else {
        var mail = require('../validations/welcome').mailverify(req.email);
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
         
        );
      }
    });
  });

  router.post("/register", (req, res) => {
    
    const { errors, isValid } = ValidateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Member.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } 
      else {
        var otp = require('random-int')(1000, 10000);
        const newUser = new Member({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          otp: otp.toString(),
          isVerified: false
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user), require('../validations/mail').mailverify(req.body.email,otp))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  router.post("/generate",(req,res)=>{
    const { errors, isValid } = ValidateForgotInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    var otp = require('random-int')(1000, 10000);
    var update = {otp: otp}
    Member.findOneAndUpdate({ email: req.body.email},update).then(user => {
      if (!user) {
      return res.status(400).json({ email: " otp is incorrect" });
      }
      else
      {
        console.log(otp);
        var mail = require('../validations/update').mailverify(req.body.email,otp);
        return res.status(200).json({ send : "done"});
      }
    });
  });
  router.post("/facebook", (req, res) => {
    Member.findOne({ email: req.body.email}).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res.status(400).json({ email: "This email is already registered" });
          }
        });
      } 
      else {
        var otp = require('random-int')(1000, 10000);
        const newUser = new Member({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          otp: otp.toString(),
          isVerified: true
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {console.log(err); return res.status(400).json({ server: "Internal server error" });};
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = {
                  id: user.id,
                  name: user.name,
                  email: user.email
                };
                var mail = require('../validations/welcome').mailverify(user.email);
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {
                    expiresIn: 31556926
                  },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    });
                  }
                );
              })
              .catch(err => {console.log(err); return res.status(400).json({ server: "Internal server error" });});
          });
        });
      }
    });
  });
  router.post("/generate",(req,res)=>{
    const { errors, isValid } = ValidateForgotInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    var otp = require('random-int')(1000, 10000);
    var update = {otp: otp}
    Member.findOneAndUpdate({ email: req.body.email},update).then(user => {
      if (!user) {
      return res.status(400).json({ email: " otp is incorrect" });
      }
      else
      {
        console.log(otp);
        var mail = require('../validations/update').mailverify(req.body.email,otp);
        return res.status(200).json({ send : "done"});
      }
    });
  });
  router.post("/update", (req, res) => {
    const { errors, isValid } = ValidateChangeInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
       var update = {password: hash}
       Member.findOneAndUpdate({ email: req.body.email, otp: req.body.otp },update).then(user => {
        if (!user) {
        return res.status(400).json({ email: " otp is incorrect" });
      } 
      else {
        console.log("password changed")
        return res.status(200).json({ password: "changed"});
      }
    });
  });
  });
  });

  router.post("/login", (req, res) => {
    const { errors, isValid } = ValidateLoginInput(req.body);// Check validation
    
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    Member.findOne({ email }).then(user => {

      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found " });
      }
      else if(!user.isVerified)
      {
        return res.status(404).json({emailnotverified: "Email not verified"})
      };
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
  router.get('/getdata', function(req, res){
      Member.find({},{otp: 0,password: 0}).collation({locale: "en" }).sort({name: 1}).then(docs => {
      res.send(docs);
    })
    
  });
  router.post('/updateprofile',(req,res)=>{
    console.log(req.body);
    Member.findOneAndUpdate({ email: req.body.email},req.body).then(user => {
    });
  });
  router.post('/query',(req,res)=>{
    const { errors, isValid } = ValidateQuery(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    require('../validations/query').mailQuery(req.body.name,req.body.email,req.body.query)
    res.send("done");
  });

  router.post('/representative',(req,res)=>{

    const { errors, isValid } = ValidateRepresentative(req.body);// Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    require('../validations/representative').mailQuery(req.body.name,req.body.email,req.body.college)
    res.send("done");
  });

  router.get('/count',function(req,res){
    console.log("hey");
    var cont = 0;
    Count.findOne({}).then(docs => {
       if(docs)
       {
         cont=docs.cnt;
         Count.findOneAndUpdate({},{cnt: cont+1})
         .then(res.send({cnt: cont+1}))
       }
       else
       {
         var New = new Count({
           cnt: 1
         });
         New.save()
         .then( res.send({cnt: 1}));
       }
    })  
  });
  module.exports = router;
 