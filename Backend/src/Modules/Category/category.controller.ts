import { NextFunction, Request, Response } from 'express'
import Category from './category.modules'
import path from 'path'
import fs from 'fs'

const deleteImage = file => {
    const filePath = path.join(__dirname, '../../../images/category', file)
    fs.unlink(filePath, unlinkError => {
      if (unlinkError) {
        console.error('Failed to delete the uploaded file:', unlinkError)
      } else {
        console.log('Uploaded file deleted successfully.')
      }
    })
  }

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    const image =
    req.protocol +
    '://' +
    req.get('host') +
    '/images/category/' +
    req?.file.filename
    
    data.thumbnail = image

    const result = await Category.create(data)

    res.status(200).json({
      status: 'Success',
      message: 'Category created successfully',
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


export default{
    createCategory
}
