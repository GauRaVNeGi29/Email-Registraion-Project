import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer"
import { User } from '../models/User.js';
const router = express.Router();


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({email})
    if (user) {
        return res.json({ message: "User already exists" });
    }  
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashpassword
    });

    await newUser.save();
    return res.status(201).json({ status:true, message: "User registered successfully" });
    
}); 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if (!user) {
        return res.json({ message: "User is not registered" });
    } 
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.json({ message: "Password is incorrect" });
    }
    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "Login successfully" });
})

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User is not registered" });
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });

        const resetLink = `http://localhost:5173/reset-password/${token}`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            }
        });

        var mailOptions = {
            from: process.env.MAIL,
            to: email,
            subject: 'reset password',
            text: `Please click the link below to reset your password: \n ${resetLink}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({ message: "error" })
            } else {
                res.json({ status: true, message: "email sent" })
            }
        });

    } catch (err) {
        console.error(err);
    }
});

router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({_id: id}, {password: hashPassword})
        return res.json({status: true, message: "updated password"})
    } catch (err) {
        return res.json("invalid token")
    }
})

const verifyUser = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({status:false, message: "no token"})
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next()
    }catch(err){
            return res.json(err)
        }
}

router.get('/verify', verifyUser, (req, res) => {
    return res.json({status:true, message: "authorized"})
})

router.get('/logout', (req, res)=>{
    res.clearCookie('token')
    return res.json({status: true})
})

export {router as UserRouter}
