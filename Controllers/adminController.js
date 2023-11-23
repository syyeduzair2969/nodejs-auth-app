const {Admin}= require('./../Model/emModel');
//const AAFeatures = require('./../Utils/features');

exports.getAllAdmin = async(req, res) => {
    try{
      //  const Employee = await Emp.find({});
       const admin = await Admin.find({});
     //   let emp = await features.query;
       //console.log(admin);
     //   console.log(err);
        res.status(200).json({
            status: "Success",
           // length: emp.length,
            data:{
                admin
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


exports.createAdmin = async(req, res) => {
    try{
        const admin=await Admin.create(req.body);
        console.log(admin);
        res.status(201).json({
            status: "success",
            admin
        })
    }catch(err){
        res.status(400).json({
            status: "Fail to load",
            message: err.message
        })
    }
}

exports.getAdmin = async(req, res) => {
    try{
    const admin= await Admin.findById(req.params.id);
    res.status(200).json({
        status: "Success",
        data:{
            admin
        }
    })
    }catch(err){
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
    
}

exports.updateAdmin = async(req, res) => {
    try{
      const updateadmin= await Admin.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
      res.status(200).json({
          status: "Success",
          data:{
            updateadmin:updateadmin
          }
      })
    }catch(err){
      res.status(404).json({
          status:"Prolem facing",
          message:err.message
      })
    }
  }
  exports.deleteAdmin = async(req, res) => {
      try{
          const dltAdmin= await Admin.findByIdAndDelete(req.params.id);
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
