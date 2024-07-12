import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
const router = express.Router();
import jwt from 'jsonwebtoken';
// import { Resend } from 'resend';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

// const resend = new Resend(process.env.RE_KEY);

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    try {
        if (user) {
            return res.json({ message: "User already existed" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashpassword
        });

        await newUser.save();
        return res.json({ status: true, message: "Record registered" });
    } catch (err) {
        res.json({ message: "error aa rha h" })
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
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
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User is not registered" });
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });

        const resetLink = `https://email-registraion-project-vyas.vercel.app/reset-password/${token}`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'negigaurav419@gmail.com',
                pass: 'udxs ztsk iewe asvt'
            }
        });

        var mailOptions = {
            from: 'negigaurav419@gmail.com',
            to: email,
            subject: 'reset password',
            text: `Please click the link below to reset your password: \n ${resetLink}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({ message: "error" })
            } else {
                res.json({ status: true, message: "email sent" })
            }
        });

        // await resend.emails.send({
        //     from: 'negigaurav419@gmail.com',
        //     to: email,
        //     subject: 'Password Reset Request',
        //     html: `<p>Please click the link below to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
        // });
        // return res.json({ message: "Password reset email sent" });
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


export { router as UserRouter };
