import { NextFunction, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import ProductModel from './product.modules'

const deleteImage = file => {
  const filePath = path.join(__dirname, '../../../images/products', file)
  fs.unlink(filePath, unlinkError => {
    if (unlinkError) {
      console.error('Failed to delete the uploaded file:', unlinkError)
    } else {
      console.log('Uploaded file deleted successfully.')
    }
  })
}

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    let images = []
    req?.files?.map(item => {
      const url =
        req.protocol +
        '://' +
        req.get('host') +
        '/images/products/' +
        item.filename

      images.push(url)
    })

    data.photos = images

    const result = await ProductModel.create(data)
    res.status(200).json({
      status: 'success',
      message: 'Successfully registered',
      data: result
    })
  } catch (error) {
    if (req.files) {
      req.files.map(item => deleteImage(item.filename))
    }
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await ProductModel.find({})

    res.status(200).json({
      status: 'success',
      message: 'Successfully fetched',
      data: results
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const getData = await ProductModel.findOne({ _id: id })

    if (!getData) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Product not found'
      })
    }

    const result = await ProductModel.deleteOne({ _id: id })
    getData.photos.map(item => {
      const parts = item.split('/')
      const lastPart = parts[parts.length - 1]
      deleteImage(lastPart)
    })
    res.status(200).json({
      status: 'Success',
      message: 'Product created successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const data = req.body
    const getData = await ProductModel.findOne({ _id: id })

    if (!getData) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Product not found'
      })
    }

    const result = await ProductModel.updateOne(
      { _id: id },
      {
        $set:data
      }
    )
    res.status(200).json({
      status: 'Success',
      message: 'Product updated successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

export default {
  createPost,
  getAllProducts,
  deleteProduct,
  updateProduct
}
