const userModel=require('../models/user.js')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt') 

const signin=async(req,res)=>{
    try{
        const {name,email,contact,password}=req.body
        const userName=await userModel.findOne({email})
        if(userName){
            return res.status(409).json({message:'User already exists', success: false})
        }
        const userNew=new userModel({name,email,contact,password})
        userNew.password=await bcrypt.hash(password,10)
        await userNew.save()
        res.status(201).json({
            message:'Signed in successfully',
            success:true,
        })
    }
    catch(err){
        res.status(500).json({
           message:`Signed in Failed ${err}`,
           success:false
        })
    }
    }
 

const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const userName=await userModel.findOne({email})
        if(!userName){
            return res.status(403).json({message:'Email or password is wrong', success: false})
        }
        const isEqual=await bcrypt.compare(password,userName.password)
        if(!isEqual){
            return res.status(403).json({message:'Email or password is wrong', success: false})
        }
        const jwtToken=jwt.sign(
            {email:userName,_id:userName._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        res.status(200).json({
            message:'Logged in successfully',
            success:true,
            email,
            jwtToken,
            name:userName.name
        })
    }
    catch(err){
        res.status(500).json({
           message:`Signed in Failed ${err}`,
           success:false
        })
    }
}


module.exports={
    signin,
    login
}