import { NextFunction, Request, Response } from 'express'
import User from './user.model'
import path from 'path'
import fs from 'fs'
import sendOTPEmail from '../../utilis/sendOTP'

const deleteImage = file => {
  const filePath = path.join(__dirname, '../../../images/users', file)
  fs.unlink(filePath, unlinkError => {
    if (unlinkError) {
      console.error('Failed to delete the uploaded file:', unlinkError)
    } else {
      console.log('Uploaded file deleted successfully.')
    }
  })
}

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body
    const image =
      req.protocol +
      '://' +
      req.get('host') +
      '/images/users/' +
      req?.file.filename
    userData.photo = image
    const result = await User.create(userData)

    sendOTPEmail(result.email)

    res.status(200).json({
      status: 'success',
      message: 'Successfully registered',
      data: result
    })
  } catch (error) {
    if (req.file) {
      deleteImage(req.file.filename)
    }
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

export default { registerUser }
