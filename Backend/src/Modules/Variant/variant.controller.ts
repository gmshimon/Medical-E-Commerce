import { NextFunction, Request, Response } from 'express'
import VariantModel from './variant.modules'

const createVariant =async (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
    try {
        const data = req.body
        const result = await VariantModel.create(data)

        res.status(200).json({
            status: 'Success',
            message: 'Variant created successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
          })
    }
}
const getAllVariants =async (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
    try {
        const result = await VariantModel.find({})

        res.status(200).json({
            status: 'Success',
            message: 'Variant created successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
          })
    }
}
const updateVariant =async (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
    try {
        const {id} = req.params
        const data = req.body
        const getData = await VariantModel.findOne({_id:id})

        if(!getData){
            return res.status(404).json({
                status: 'Failed',
                message: 'Variant not found'
            })
        }


        const result = await VariantModel.updateOne(
            {_id:id},
            {
                $set:{
                    name: data.name,
                    price: data.price,
                }
            }
        )

        res.status(200).json({
            status: 'Success',
            message: 'Variant created successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
          })
    }
}
const deleteVariant =async (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>{
    try {
        const {id} = req.params
        const getData = await VariantModel.findOne({_id:id})

        if(!getData){
            return res.status(404).json({
                status: 'Failed',
                message: 'Variant not found'
            })
        }


        const result = await VariantModel.deleteOne({_id:id})

        res.status(200).json({
            status: 'Success',
            message: 'Variant created successfully',
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
    createVariant,
    getAllVariants,
    updateVariant,
    deleteVariant
}