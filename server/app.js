import express from 'express'
import dbconnect from './config/dbconnect.js'
import userRoutes from './routes/users.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index.js';
import userRouter from './routes/users.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.json({extended:true}));

app.use('/', indexRouter);
app.use('/api/users', userRouter);

let PORT=5000;
app.listen(PORT,()=>console.log("server running"));
dbconnect();
