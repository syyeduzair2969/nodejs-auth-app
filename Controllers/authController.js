const User = require('./../Model/userModel');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const costomErrorClass = require('./../Utils/CustomError');
const CustomError = require('./../Utils/CustomError');
const util = require('util');


const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET_STR, {
        expiresIn : process.env.LOGIN_EXP
    });
}

exports.signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await User.create(req.body);
    const token=signToken(newUser._id);
    //console.log(token);
    

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = asyncErrorHandler( async ( req, res, next) =>{
    const email = req.body.email;
    const password= req.body.password;
    //check if user and password field are present or not
    if(!email || !password){
        //intance of our custom error class
        const error = new costomErrorClass ('Please enter email & pass correctl', 400);
        return next(error);
    };
    //checking if the user is present inthe database or not
    const user = await User.findOne({ email }).select("+password");
    //checking the password, if match or not(it will return boolean value)

    //const isMatch=await user.ComparePasswithDB(password, user.password);

    //checking password/comparison
    if(!user || !(await user.ComparePasswithDB(password, user.password))){
        const err= new CustomError('Incorrect email or password', 400);
        return next(err);
    }
    const token=signToken(user._id);
   // console.log(user);
    res.status(200).json({
        status : 'success',
       // user,
        token
    });
});


exports.protect = asyncErrorHandler(async(req, res, next) =>{
    //read the token if it exist or not
    const testToken=req.headers.authorization;
    //console.log(testToken);
    let token;
    if(testToken && testToken.startsWith('bearer')){
        token = testToken.split(' ')[1];
    }
    //console.log(token);
    if(!token){
        return next(new CustomError('You are not logged in!',404));
    }
    //check the token, it is valid or not 
    const decoded= await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    console.log(decoded);
    //if the user exist or not 
    const userCheck = await User.findById(decoded.id);
  //  console.log('im calling '+userCheck);
    if(!userCheck){
       return  next(new CustomError('Unfortunatilt user does not exist!',401));
    }
    //if the user changed the password after the token was used
    if(await userCheck.isPasswordChanged(decoded.iat)){
        return next(new CustomError('The password has been changed recently ', 401));
    }
    //Allow the user to access the route
    req.userCheck = userCheck;
    next();
});
//req.user.role !== role
//!role.includes(req.user.role)

exports.userRole = (...role) => {
    return (req, res, next) =>{
        const val=role.includes(req.userCheck.role);
       // console.log('im started -->'+val+'<-- im closed');

        if(!(role.includes(req.userCheck.role))){
            const errr = new CustomError('You do not have permession to perform this role ', 403);
            next(errr);
        }
        next();
    }
}

exports.userAdmin = (role) => {
    return (req, res, next) =>{
        //const val=role.includes(req.userCheck.role);
       // console.log('im started -->'+val+'<-- im closed');
        if(req.userCheck.role !== role){
            const errr = new CustomError('You do not have permession to perform this role ', 403);
            next(errr);
        }
        next();
    }
}

//userRequest
exports.userRequest = (role) => {
    return (req, res, next) =>{
        //const val=role.includes(req.userCheck.role);
       // console.log('im started -->'+val+'<-- im closed');
        if(req.userCheck.role !== role){
            const errr = new CustomError('You do not have permession to perform this role ', 403);
            next(errr);
        }
        next();
    }
}

//hrRequest
exports.hrRequest = (role) => {
    return (req, res, next) =>{
        //const val=role.includes(req.userCheck.role);
       // console.log('im started -->'+val+'<-- im closed');
        if(req.userCheck.role !== role){
            const errr = new CustomError('You do not have permession to perform this role ', 403);
            next(errr);
        }
        next();
    }
}