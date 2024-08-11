import { NextFunction, Request, Response } from 'express'
import User from './user.model'

const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userData = req.body
        const result = await User.create(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Successfully registered',
            data: result
          })
    }catch(error){
        res.status(400).json({
            status: 'Failed',
            message: error
          })
    }
}

export default { registerUser  }