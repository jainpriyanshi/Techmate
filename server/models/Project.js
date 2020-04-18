const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const ProjectSchema = new Schema({
    proposedby: {
        type: String,
        required: true
    },
    proposedid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    technology: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    idea : {
        type: String,
        required: true
    },
    contactmail: {
        type: String,
        required: true
    },
    team : [
        {
            name: {
                type: String,
            },
            role: {
                type: String,
            }
        }
       
    ],
    deadline: {
        type: String,
        required: true
    },
    comments: [{
        type: String,
    }]
});

module.exports = Project = mongoose.model("projects",ProjectSchema);