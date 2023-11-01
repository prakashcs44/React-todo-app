const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        min:4
    },
    password:{
        type:String,
        required:true,
        
    }
})

const UserModel = mongoose.model("User",UserSchema);

module.exports = UserModel;