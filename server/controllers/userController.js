import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.json ({
                success: false, message: 'Please fill all the fields'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token, user:{name : user.name} })
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if (!user){
            return res.json({success: false, message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        } else{
            return res.json({success: false, message: 'Invalid Credentials'})
        }
    } 
    catch(error){
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


export {registerUser, loginUser};