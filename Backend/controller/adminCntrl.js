const adminMdl = require("../models/adminMdl")
const userMdl = require("../models/userMdl")
const {responseGenerator, hashpassword, comparepassword, generateTokens} = require("../utils/utils");
const { default: mongoose } = require("mongoose");



const registerAdmin = async(req,res)=>{
    try{
        const data = req.body;
        const {email}=data
        const existingAdmin = await adminMdl.findOne({ email})
        if(existingAdmin){
            let resp = responseGenerator(false, "Admin already exists...!!!");
            return res.status(400).json(resp);
        }
        data.password = await hashpassword(data.password)
        const admin= new adminMdl(data)
        await admin.save()
        let resp = responseGenerator(true, "Admin registered successfully...!!!", admin.id)
        return res.status(201).json(resp)
        
    }
    catch(err){
        res.status(500).json({message:"Error while registering admin...!!!",error:err.message})
    }
}

const registerUser = async(req,res)=>{
    try{
        const data = req.body;
        const {email}=data
        const existingUser = await userMdl.findOne({ email})
        if(existingUser){
            let resp = responseGenerator(false, "user already exists...!!!");
            return res.status(400).json(resp);
        }
        data.password = await hashpassword(data.password)
        const user= new userMdl(data)
        await user.save()
        let resp = responseGenerator(true, "user registered successfully...!!!", user.id)
        return res.status(201).json(resp)
        
    }
    catch(err){
        res.status(500).json({message:"Error while registering user...!!!",error:err.message})
    }
}


const loginAdmin = async(req,res)=>{
    try{
        const {email,password} = req.body
        const admin = await adminMdl.findOne({email}).lean()
        if(!admin){
            let resp = responseGenerator(false, "Admin not found...!!!")
            return res.status(401).json(resp)
        }
        const isMatch = await comparepassword(password, admin.password)
        if(!isMatch){
            let resp = responseGenerator(false , "Invalid credentials...!!!");
            return res.status(401).json(resp)
        }
        const tokens = generateTokens({email, name:admin.name, id:admin.id})
        // console.log("login successfull...!!!")
        let resp = responseGenerator(true, "Admin Loggeed in successfully..!!!",{id:admin.id, tokens})
        return res.status(200).json(resp)
    }catch(err){
        let resp = responseGenerator(false, "Error while logging in...!!!", err.message)
        return res.status(500).json(resp)
    }
}

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await userMdl.findOne({email}).lean()
        if(!user){
            let resp = responseGenerator(false, "user not found...!!!")
            return res.status(401).json(resp)
        }
        const isMatch = await comparepassword(password, user.password)
        if(!isMatch){
            let resp = responseGenerator(false , "Invalid credentials...!!!");
            return res.status(401).json(resp)
        }
        const tokens = generateTokens({email, name:user.name, id:user.id})
        console.log("login successfull...!!!")
        let resp = responseGenerator(true, "user Loggeed in successfully..!!!",{id:user.id, tokens})
        return res.status(200).json(resp)
    }catch(err){
        let resp = responseGenerator(false, "Error while logging in...!!!", err.message)
        return res.status(500).json(resp)
    }
}

module.exports={
    registerAdmin, 
    loginAdmin,
    registerUser,
    loginUser,
}