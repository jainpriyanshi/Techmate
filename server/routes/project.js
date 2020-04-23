const express = require("express");
const router =  express.Router();
const Validator = require("validator");
const isEmpty = require("is-empty");

const ValidateProjectRegister = function validateProjectRegister(data) {
    let errors = {};
    data.contactmail = !isEmpty(data.contactmail) ? data.contactmail : "";
    data.topic = !isEmpty(data.topic) ? data.topic : "";
    data.technology = !isEmpty(data.technology) ? data.technology : "";
    data.proposedby = !isEmpty(data.proposedby) ? data.proposedby : "";
    data.proposedid = !isEmpty(data.proposedid) ? data.proposedid : "";
    data.deadline = !isEmpty(data.deadline) ? data.deadline : "";
    data.idea = !isEmpty(data.idea) ? data.idea : "";
    data.github = !isEmpty(data.github) ? data.github : "";
    data.title = !isEmpty(data.title) ? data.title : "";

    if (Validator.isEmpty(data.contactmail)) {
      errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.contactmail)) {
      errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }
    if (Validator.isEmpty(data.topic)) {
        errors.topic = "Topic field is required";
    }
    if (Validator.isEmpty(data.technology)) {
        errors.technology = "Technology field is required";
    }
    if (Validator.isEmpty(data.proposedby)) {
      errors.name = "Name field is required";
    }
    if (Validator.isEmpty(data.idea)) {
      errors.idea = "Idea field is required";
    }
    if (Validator.isEmpty(data.github)) {
      errors.github = "Github field is required";
    }
    if (Validator.isEmpty(data.deadline)) {
      errors.deadline = "Deadline field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  const ValidateProjectUpdate = function validateProjectRegister(data) {
    let errors = {};
    data.contactmail = !isEmpty(data.contactmail) ? data.contactmail : "";
    data.topic = !isEmpty(data.topic) ? data.topic : "";
    data.technology = !isEmpty(data.technology) ? data.technology : "";
    data.proposedid = !isEmpty(data.proposedid) ? data.proposedid : "";
    data.deadline = !isEmpty(data.deadline) ? data.deadline : "";
    data.idea = !isEmpty(data.idea) ? data.idea : "";
    data.github = !isEmpty(data.github) ? data.github : "";
    data.title = !isEmpty(data.title) ? data.title : "";

    if (Validator.isEmpty(data.contactmail)) {
      errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.contactmail)) {
      errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }
    if (Validator.isEmpty(data.topic)) {
        errors.topic = "Topic field is required";
    }
    if (Validator.isEmpty(data.technology)) {
        errors.technology = "Technology field is required";
    }
    if (Validator.isEmpty(data.idea)) {
      errors.idea = "Idea field is required";
    }
    if (Validator.isEmpty(data.github)) {
      errors.github = "Github field is required";
    }
    if (Validator.isEmpty(data.deadline)) {
      errors.deadline = "Deadline field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  const Project = require ("../models/Project");
  router.post("/propose", (req, res) => {
    const { errors, isValid } = ValidateProjectRegister(req.body);
    console.log(errors);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newProject = new Project({
          proposedby: req.body.proposedby,
          proposedid: req.body.proposedid,
          title: req.body.title,
          topic : req.body.topic,
          technology: req.body.technology,
          github: req.body.github,
          idea: req.body.idea,
          contactmail: req.body.contactmail,
          deadline: req.body.deadline,
          team : req.body.team,
        });
        newProject
            .save()
            .then(res.send("done"))
            .catch(err => console.log(err));
    });

    router.get('/getdata', function(req, res){
      Project.find({}).then(docs => {
      res.send(docs);
    })
  });
  router.post('/updateproject',(req,res)=>{
    const { errors, isValid } = ValidateProjectUpdate(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.body);
    Project.findOneAndUpdate({ _id: req.body._id , proposedid: req.body.proposedid},req.body).then(user => {
      res.send("done");
    });

  });

module.exports = router;  