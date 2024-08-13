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
    let images=[]
    req?.files?.map(item=>{
        const url = req.protocol +
        '://' +
        req.get('host') +
        '/images/products/' + item.filename

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
      req.files.map(item=>deleteImage(item.filename))
    }
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}


export default {
    createPost
}