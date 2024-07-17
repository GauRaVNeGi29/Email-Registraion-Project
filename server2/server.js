import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import { UserRouter } from './routes/user.js'


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["https://email-registraion-project-vyas.vercel.app"],
    methods: ["POST","GET"],
    credentials:true,
    optionsSuccessStatus: 204
}));

// const allowedOrigins = ['https://email-registraion-project-vyas-r921wh6ai.vercel.app', 'https://another-allowed-origin.com'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204
// };
// app.use(cors(corsOptions));
const http = require('http');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://email-registraion-project-vyas-r921wh6ai.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  // Your server logic here
}).listen(3000);

app.use(cookieParser())
app.use('/auth', UserRouter)



mongoose.connect('mongodb://127.0.0.1:27017/authentication')


app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port `);
})

