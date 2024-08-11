import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './Config/db';
const app: Application = express();

app.use(cors());

//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB()
app.get('/',async(req:Request,res:Response, nest:NextFunction)=>{
    res.send('Hello from Express Server')
})
export default app