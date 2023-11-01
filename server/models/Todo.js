const mongoose = require("mongoose");

const  TodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        default:""
    }, 
    completed:{
        type:Boolean,
        default:false
    },
    author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }

},{timestamps:true});

const TodoModel = mongoose.model("Todo",TodoSchema);

module.exports = TodoModel;
