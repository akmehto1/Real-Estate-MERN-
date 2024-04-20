const bcrypt = require('bcrypt');
const saltRounds = 10;
const user=require('../model/user.model');
const { response } = require('express');
const errorhandler=require('../utils/errror')
var jwt = require('jsonwebtoken');

const signup=async(req,res,next)=>{
    console.log("hit");
   
    const {username,email,password} = req.body;
    const User=user.findOne({
        $or:[
           {email:email},
           {username:username}       
        ]
    })


    console.log(username,email,password)
    
    // const hashPassword = await bcrypt.hashSync(password, 10);
    const newuser=new user({username,password,email});

    try{
        await newuser.save();
       return  res.status(201).json({succues:true,message:"user created successfully",user:newuser});
    }
    catch(err){
        next(errorhandler(500,"Couldn't create user already existing"));
    }

}



const signin=async(req,res,next)=>{
    const {password,email}=req.body;
    console.log("signin");

   try{
    const userExist=await user.findOne({email:email});
    if(!userExist){
         next(errorhandler(500,'Couldnt find user'));
         return;
    }

    console.log(userExist);
    if(userExist.password!=password){
    next(errorhandler(500,"Invalid password"));
    return;
    }

 
var token = jwt.sign({ id:userExist._id}, 'shhhhh');

const {password:pass,...rest}=userExist._doc;
console.log("password: ");
 res.cookie('access_tokens',token,{httpOnly:true}).status(200).json({user:rest})   
   }
   catch(error){
    console.log("error")
    next(error)
   }
    
}


const google=async(req,resp,next)=>{

    const {email,password,photoURL,username}=req.body;
console.log("google");
    try{
        const user=await user.findOne({email:email});
        console.log(user);
        if(user){
            var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            const {password:pass,...rest}=user._doc;
            res.cookie('access_tokens',token,{httpOnly:true}).status(200).json({user:rest});
        }
        else{
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
              const newUser=await new user({username,email,password})
              newUser.save();
              var token = jwt.sign({ email: email}, 'shhhhh');
              const {password:pass,...rest}=newUser._doc;
              res.cookie('access_tokens',token,{httpOnly:true}).status(200).json({user:rest});
        }

    }catch(error){
        console.log("error");
          errorhandler(500,"Error");
    }


}


module.exports ={signup,signin,google};