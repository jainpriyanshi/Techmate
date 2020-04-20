const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const PostSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'members'
    },
    name:{
      type: String,
      required: true
    },

    doubt: {
        type: String,
        required: true
    },

    likes:{
        type: Number,
        default: 0
    },

    n_comments:{
      type:Number,
      default:0
    },

    description:{
      type: [Schema.Types.Mixed],
      required:true
    },

    category:{
      type: "String",
       required: true
    },


    comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'members'
          },

          name:{
            type: String,
            required: true
          },

          tagUserName:{
            type: String,
          },

          tagUserId:{
            type: Schema.Types.ObjectId,
            ref: 'members'
          },

          
          comment: {
            type: String,
            required: true
          },
          
          date: {
            type: Date,
            default: Date.now
          },

          likes:{
            type: Number,
            default:0,
          }
        }
      ],

      date: {
        type: Date,
        default: Date.now
      }

    
});

module.exports = Post = mongoose.model("posts",PostSchema);