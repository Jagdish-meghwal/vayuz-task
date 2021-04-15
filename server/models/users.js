import mongoose  from "mongoose";

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});


const DetailSchema=mongoose.Schema({
    profilePicture:{
        type:String
    },
    dateOfBirth: {
        type: String
    }
});

const User=mongoose.model('User',UserSchema);
const UserDetails=mongoose.model('UserDetails',DetailSchema);

export {User, UserDetails} ; 

