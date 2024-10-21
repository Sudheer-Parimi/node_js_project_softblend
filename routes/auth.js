const express=require('express');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const User = require('../models/user');

const router= express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User successfully registered
 *       400:
 *         description: Bad request
 */

// Sign Up route

router.post('/signup', async(req,res)=>{
    const {name,email, password}=req.body;
    try{
        let user= await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"})
        }
        const newUser= new User({name,email,password:await bcrypt.hash(password,10)});
        newUser.save();

        const token= jwt.sign({userId:newUser.id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
        res.json({token});
    }
    catch(error){
        res.status(500).json({msg:"Internal server error", error: error.message});
    }

});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: JWT Token returned
 *       400:
 *         description: Invalid credentials
 */

//Route for login

router.post('/login', async (req,res)=>{
    const {email,password}=req.body;

    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Credentials does not match"});
        }
        const match= await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({msg: "Incorrect password"});
        }
        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
        res.json({token});
    }
    catch(error){
        res.status(500).json({msg:"Internal server error",error:error.message})
    }
});

module.exports=router;
