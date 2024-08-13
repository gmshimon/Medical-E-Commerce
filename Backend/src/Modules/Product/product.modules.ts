import { Model, model, Schema } from 'mongoose'
import IProduct from './product.interface'

type ProductModel = Model<IProduct, object>

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  photos: [
    {
        type: String,
        required: true
    }
  ],
  description: { type: String, required: true },
  metaKey: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  stockStatus: { type: Boolean, required: true,default:true },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  categories: { type: String, required: true },
  variants: [
    {
        name:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        }
    }
  ]
})


const ProductModel = model<IProduct>('Product', productSchema);

export default ProductModel;