const errorhandler = require("../utils/errror")
const user=require('../model/user.model');

 const updateUser= async(req,resp,next)=>{
    console.log(req.body);
    console.log("hello");
    if(req.user.id !== req.params.id)return next(errorhandler(401,"You can update your own accout!"))
    try{
        const updateUser=await user.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            }
        })
        return resp.status(200).json({success:true,updatedUser:updateUser});
    }
    catch(error){
          next(error);
    }

    return ;
    
}



module.exports ={updateUser};

