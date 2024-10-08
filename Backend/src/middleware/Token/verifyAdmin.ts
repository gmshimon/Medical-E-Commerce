import jwt  from "jsonwebtoken";
import { promisify } from "util";
import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv';
dotenv.config()

const verifyAdminToken = async (req: Request, res: Response,next:NextFunction)=>{
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
        
        if (!decoded?.role==='user') {
            return res.status(401).json({
              status: 'fail',
              message: 'You are not Admin'
            })
          }
          req.body.user = decoded
      
          next()
    }  catch (error) {
        return res.status(403).json({
            status: 'Failed',
            message: error
          })
    }
}

export default verifyAdminToken