import { Model, model, Schema } from 'mongoose'
import IVariant from './variant.interface'

type VariantModel = Model<IVariant,object>

const variantSchema = new Schema<IVariant>({
    name: {
        type: String,
        required: [true,"Please provide variant name"]
    },
    price: {
        type: Number,
        required: [true,"Please provide variant price"]
    }
})

const VariantModel = model<IVariant>("Variant",variantSchema)

export default VariantModel