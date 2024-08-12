import jwt  from "jsonwebtoken";
import { promisify } from "util";
import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv';
dotenv.config()

const verifyLoginToken = async (req: Request, res: Response,next:NextFunction)=>{
    try {
        const token:string|undefined = req.headers.authorization?.split(' ')[1];

        if(!token){
            return  res.status(401).json({
                status: 'fail',
                message: 'You are not login'
              })
        }
        const verifyAsync = promisify<string, string>(jwt.verify.bind(jwt));
        const decoded = await verifyAsync(token, process.env.TOKEN_SECRET as string);
        
        req.body.user = decoded;
        console.log(decoded);
        // next()
    }  catch (error) {
        return res.status(403).json({
            status: 'Failed',
            message: 'Invalid Token'
          })
    }
}

export default verifyLoginToken