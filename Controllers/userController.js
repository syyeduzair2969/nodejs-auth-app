const {Users}= require('./../Model/emModel');
//const AAFeatures = require('./../Utils/features');
exports.getAllUsers = async(req, res) => {
    try{
       const users = await Users.find({});
        res.status(200).json({
            status: "Success",
            data:{
                users
            }
        })

    }
    catch(err){
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
   
};


exports.creatUsers = async(req, res) => {
    try{
        const users=await Users.create(req.body);

        res.status(201).json({
            status: "success",
            users
        })
    }catch(err){
        res.status(400).json({
            status: "Fail to load",
            message: err.message
        })
    }
}
exports.getUsers = async(req, res) => {
    try{
        const role =req.params.role;
        const users= await Users.find({ role});
    //, status: "initialized"
        //const reqs =req.params.name;
        //console.log("I am emp2",reqs)
        //const red=await Emp.find({reqs});
    res.status(200).json({
        status: "Success",
        data:{
            users
        }
    })
    }catch(err){
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
    
}
exports.updateUsers = async(req, res) => {
    try{
      const users= await Users.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
      res.status(200).json({
          status: "Success",
          data:{
            users:users
          }
      })
    }catch(err){
      res.status(404).json({
          status:"Prolem facing",
          message:err.message
      })
    }
  }
  exports.deleteUsers = async(req, res) => {
      try{
          const users= await Users.findByIdAndDelete(req.params.id);
          res.status(204).json({
              status:"Record deleted",
              data: null
          })
      }
      catch(err){
          res.status(404).json({
              status:"Problem facing",
              message:err.message
          })
      }
  }
  exports.getUserlogin =async (req, res) => {
    const { email, password,role } = req.body;
    //validation
    if (!email || !password|| !role) {
      next("Please Provide All Fields");
    }
    //find user by email
    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
      next("Invalid Useraname or password");
    }

   // if(email==Users.)





    // console.log("im hitting bro");
    // if (req.params.body == null) {
    //     res.status("401").send("Vales is null/empty");
    //   }
    //   else if(req.params.body=!(Users.email && Users.password)){
    //     res.status("401").send("User is unauthenticated.");
    //   }
    //   else if(req.params.body==(Users.email && Users.password)){
    //     if(Users.role==0){
    //         res.status("200").send("You are succeffuly login, you are Admin pannel");
    //        // next();
    //     }
    //     else if(Users.role==1){
    //         res.status("200").send("You are succeffuly login, you are in HR pannel");
    //        // next();
    //     }
    //     else if(Users.role==2){
    //         res.status("200").send("You are succeffuly login");
    //        // next();
    //     }
    //   }
      
      
    //   else {
    //     console.log("im hitting bro");
    //   }
}