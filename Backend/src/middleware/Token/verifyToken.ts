import jwt from "jsonwebtoken";
import { promisify } from "util";
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
  // Add other properties if your token has more
}

const verifyLoginToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in'
      });
    }

    const verifyAsync = promisify<string, string | undefined>(jwt.verify as jwt.VerifyCallback);
    const decoded = await verifyAsync(token, process.env.TOKEN_SECRET as string) as DecodedToken;

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: 'Failed',
      message: 'Invalid Token'
    });
  }
};

export default verifyLoginToken;
