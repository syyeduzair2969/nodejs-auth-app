const {Emp} = require('./../Model/emModel');
const User = require('./../Model/userModel')
//const AAFeatures = require('./../Utils/features');




exports.getAllEmp = async(req, res) => {
    try{
       const emp = await Emp.find({});
     console.log(emp);
        res.status(200).json({
            status: "Success",
           // length: emp.length,
            data:{
                emp
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
exports.registerRequest = async(req, res) => {
    try{
        console.log("hy bro");
        // email: req.body.email
       const nameData = await User.findOne(req.name);
       // console.log(nameData);
        const dataa = new Emp({
            name:nameData,
            request: req.body.request,
            comment: req.body.comment,
            status: req.body.status,
        });
       const emp=await Emp.create(dataa);

        res.status(201).json({
            status: "success",
            emp
        })
    }catch(err){
        res.status(400).json({
            status: "Fail to load",
            message: err.message
        })
    }
}

exports.getEmp = async(req, res) => {
    try{
        const name =req.params.name;
        const emp= await Emp.find({ name});
    //, status: "initialized"
        //const reqs =req.params.name;
        //console.log("I am emp2",reqs)
        //const red=await Emp.find({reqs});
    res.status(200).json({
        status: "Success",
        data:{
            emp
        }
    })
    }catch(err){
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
    
}
exports.updateStatus = async(req, res) => {
    try{
      const updateEmp= await Emp.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
      res.status(200).json({
          status: "Success",
          data:{
            updateEmp:updateEmp
          }
      })
    }catch(err){
      res.status(404).json({
          status:"Prolem facing",
          message:err.message
      })
    }
  }
  exports.deleteEmp = async(req, res) => {
      try{
          const dltEmp= await Emp.findByIdAndDelete(req.params.id);
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

