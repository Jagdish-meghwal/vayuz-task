import express from 'express';
import {  registerValidation } from '../validation.js';
import {User,  UserDetails } from '../models/users.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import config from 'config'
import mongoose  from "mongoose";

export const register = async(req,res)=>{
       try{
        let {name,email,password}=req.body;
        let user = await User.findOne({email});
        const {error}=registerValidation(req.body);
        console.log("-------"+error);
        if(error) return res.status(404).send(error.details[0].message);
        
        if(user){
            return res.status(401).send("user already exist");
        }
        const salt= await bcryptjs.genSalt(10);
        password= await bcryptjs.hash(password,salt);
        user=new User({
            name,
            email,
            password
        });
        await user.save();
        console.log(user);
        const payload ={
            user:{
                id:user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
        )
    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    }
    res.send(req.body)
}
export const addUserDeatail = async(req,res)=>{
    try{
     const { id } = req.params;
     let {dateOfBirth,profilePicture}=req.body;
     
     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

     const data = {
         _id:id,
         dateOfBirth: dateOfBirth,
         profilePicture: profilePicture
     }
     const userdatials = new UserDetails(data);
     await userdatials.save();
     res.status(201).json(userdatials);
 }catch(error){
     console.log(error.message);
     return res.status(500).json({msg:"server error"});
 }
 res.send(req.body)
}