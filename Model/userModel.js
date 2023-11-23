const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt= require('bcryptjs')

//name, email, password, confirmPassword
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: 8,
        select : false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate:{
            validator:function(val){
                return val == this.password;
            },
            message: "Message & Confirm password does not match"
        }
    },
    role:
    {
        type: String,
       // required: [true, "Status is required"],
        //enum: {values: [0, 1, 2], message: "Should be 0,1 or 2"}
        enum: ["user", "hr", "admin"],
        default: "user"
    },
    passwordHasChanged : Date
});
//encrypt the pass before going to database
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    
    //encrypt the password bedore saving it
    this.password= await bcrypt.hash(this.password,12);

    this.confirmPassword=undefined;
});

//comparing the password which is provided by user with the password stored in DB
userSchema.methods.ComparePasswithDB = async function(pswd, pswdInDB){
    return await bcrypt.compare(pswd,pswdInDB);
}
userSchema.methods.isPasswordChanged = async function(JWTTimestamp){
    if(this.passwordHasChanged){
        //after 1000, the 10 shows base tens
        const passChangedTime = parseInt(this.passwordHasChanged.getTime() / 1000 , 10);
        console.log(passwordHasChanged, JWTTimestamp);
        return JWTTimestamp < passChangedTime;
    }
    return false;
}

const myDB = mongoose.connection.useDb('Employee');

const User=myDB.model('Users',userSchema);



module.exports = User;

