const mongoose = require("mongoose");
const validator=require('validator');
// var uri = "mongodb://localhost:27017/Employee";
// const emplooyeDB=require.connection.useDb('Employee');
// // Emp Modal Schema 

// const connection = mongoose.connection;

const employees = new mongoose.Schema({ 
    name:{
        type: String,
        default: "initialized"
    },
    request:
    {
        type: String,
        default: "initialized"
    },
    comment: {
        type: String,
        required: [true,'Comment is required'],
        trim: true
    },
    status:
    {
        type: String,
        default: "initialized"
    } 

}); 
// HR Modal Schema 
const hr_ = new mongoose.Schema({ 

    
    comment:
    {
        type: String,
        required: [true, "Comment is required"],
        trim:true
    },

    emp_name: {
        type: String,
        required: [true,'Name is required'],
        unique:true,
        trim: true
    },
    
    status:
    {
        type: String,
        required: [true, "Status is required"],
        trim:true
    } 

}); 
// Admin Modal Schema 
const admin_ = new mongoose.Schema({ 
    comment:
    {
        type: String,
        required: [true, "Comment is required"],
        trim:true
    },

    emp_name: {
        type: String,
        required: [true,'Name is required'],
        unique:true,
        trim: true
    },
    
    status:
    {
        type: String,
        required: [true, "Status is required"],
        trim:true
    } 

}); 

const user = new mongoose.Schema({ 
    email:
    {
        type: String,
        required: [true, "Email is required"],
        unique:true,
        trim:true
    },

    password: {
        type: String,
        required: [true,'Password is required'],
        
        trim: true
    },  
    role:
    {
        type: Number,
        required: [true, "Status is required"],
        enum: {values: [0, 1, 2], message: "Should be 0,1 or 2"}
    } 

}); 

    
//model name must be start from capital letter
//const Emp=mongoose.model('Emp',employees);


const myDB = mongoose.connection.useDb('Employee');

const Emp = myDB.model('Emp', employees);
const Hr=myDB.model('Hr',hr_);
const Admin=myDB.model('Admin',admin_);
const Users=myDB.model('Users',user);


module.exports = {
    Emp,
    Hr,
    Admin,
    Users
};