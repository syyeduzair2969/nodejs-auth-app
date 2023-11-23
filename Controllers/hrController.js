const {Hr}= require('./../Model/emModel');
//const AAFeatures = require('./../Utils/features');

exports.getAllHr = async(req, res) => {
    try{
      //  const Employee = await Emp.find({});
       const hr = await Hr.find({});
     //   let emp = await features.query;
      // console.log(hr);
     //   console.log(err);
        res.status(200).json({
            status: "Success",
           // length: emp.length,
            data:{
                hr
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


exports.createHr = async(req, res) => {
    try{
        const hr=await Hr.create(req.body);
        console.log(hr);
        res.status(201).json({
            status: "success",
            hr
        })
    }catch(err){
        res.status(400).json({
            status: "Fail to load",
            message: err.message
        })
    }
}

exports.getHr = async(req, res) => {
    try{
    const hr= await Hr.findById(req.params.id);
    res.status(200).json({
        status: "Success",
        data:{
            hr
        }
    })
    }catch(err){
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
    
}

exports.updateHr = async(req, res) => {
    try{
      const updateHr= await Hr.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true});
      res.status(200).json({
          status: "Success",
          data:{
            updateHr
          }
      })
    }catch(err){
      res.status(404).json({
          status:"Prolem facing",
          message:err.message
      })
    }
  }
  exports.deleteHr = async(req, res) => {
      try{
          const hr= await Hr.findByIdAndDelete(req.params.id);
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
