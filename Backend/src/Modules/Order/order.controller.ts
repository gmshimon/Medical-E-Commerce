import { NextFunction, Request, Response } from 'express'
import Order from './order.modules'
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.user
    const data = req.body
    data.email = email

    const result = await Order.create(data)

    res.status(200).json({
      status: 'success',
      message: 'Order created successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Order.find({})
    res.status(200).json({
      status: 'success',
      message: 'Order fetched successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}
const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params
    const order = await Order.findOne({_id: id})
    if(!order){
        return res.status(404).json({
            status: 'Fail',
            message: 'Order not found',
          })
    }
    const result = await Order.deleteOne({_id:id})
    res.status(200).json({
      status: 'success',
      message: 'Order fetched successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const changeStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id,status} = req.body
    const order = await Order.findOne({_id: id})
    if(!order){
        return res.status(404).json({
            status: 'Fail',
            message: 'Order not found',
          })
    }

    if(order.status === 'cancelled'){
      return res.status(400).json({
        status: 'Fail',
        message: 'Cannot update cancelled order'
      })
    }

    const result = await Order.updateOne(
        {_id:id},
        {
            $set:{
                status
            }
        }
    )
    res.status(200).json({
      status: 'success',
      message: 'Order updated successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const getMyOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  try {
    const { email } = req.user
    const userOrder = await Order.find({email: email})

    res.status(200).json({
      status: 'success',
      message: 'Order fetched successfully',
      data: userOrder
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

export default {
  createOrder,
  getAllOrders,
  deleteOrder,
  changeStatus,
  getMyOrder
}
