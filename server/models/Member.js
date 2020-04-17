const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const MemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    isVerified: {
        type : Boolean,
        required: true
    },
    codechef: {
        type: String,
        default: "",
    },
    codeforces: {
        type: String,
        default: ""
    },
    spoj: {
        type: String,
        default: ""
    },
    github: {
        type: String,
        default: ""
    },
    linkedin: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    college: {
        type: String,
        default: "",
    },
    year: {
        type: String,
        default: "",
    },
    degree: {
        type: String,
        default: "",
    },
    skills: 
        {
            type: String,
             default: "",
        }
    ,
    achievement: [
        {
        type: String,
    }]

});

module.exports = Member = mongoose.model("members",MemberSchema);