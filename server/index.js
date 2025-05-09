import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
import cors from "cors"
import { UserRouter } from "./routes/user.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)



mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));
app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`);
})