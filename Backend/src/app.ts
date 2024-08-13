import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import connectDB from './Config/db'
import path from 'path'
import dotenv from 'dotenv'

const app: Application = express()

dotenv.config()
app.use(cors())

//parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

import userRouter from './Modules/Users/user.routes'
import otpRouter from './Modules/OTP/otp.routes'
import categoryRouter from './Modules/Category/category.routes'
import productRouter from './Modules/Product/product.routes'

app.use('/api/v1/user', userRouter)
app.use('/api/v1/otp', otpRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouter)

app.get('/images/users/:filename', (req, res) => {
  const { filename } = req.params
  const imagePath = path.join(__dirname, '../images/users', filename)
  res.sendFile(imagePath)
})

app.get('/images/category/:filename', (req, res) => {
  const { filename } = req.params
  const imagePath = path.join(__dirname, '../images/category', filename)
  res.sendFile(imagePath)
})
app.get('/', async (req: Request, res: Response, nest: NextFunction) => {
  res.send('Hello from Express Server')
})
export default app
