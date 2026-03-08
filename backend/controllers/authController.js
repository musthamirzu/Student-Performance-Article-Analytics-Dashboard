const User = require("../models/User")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")

exports.register = async(req,res)=>{

    const {name,email,password,role} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({message:"User already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    })

    res.json({
        token:generateToken(user._id),
        user
    })

}

exports.login = async(req,res)=>{

    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && await bcrypt.compare(password,user.password)){

        res.json({
            token:generateToken(user._id),
            user
        })

    }else{

        res.status(401).json({message:"Invalid credentials"})
    }

}