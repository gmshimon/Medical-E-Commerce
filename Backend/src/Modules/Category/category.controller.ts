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

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Category.find({})

    res.status(200).json({
      status: 'Success',
      message: 'Category fetched successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error
    })
  }
}

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params
    const category = await Category.findOne({ _id: id })
    if (!category) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Category not found'
      })
    }
    const result = await Category.deleteOne({ _id: id })

    const parts = category.thumbnail.split('/')
    const lastPart = parts[parts.length - 1]
    deleteImage(lastPart)
    res.status(200).json({
      status: 'Success',
      message: 'Category deleted successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error
    })
  }
}

export default {
  createCategory,
  getAllCategory,
  deleteCategory
}
