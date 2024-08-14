import { Model, model, Schema } from 'mongoose'
import { IOrder } from './order.interface'

type OrderModel = Model<IOrder,object>
const orderSchema = new Schema<IOrder> ({
    carts: {
        type: [Object],
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    sub_district: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    total_discount: {
        type: Number,
        required: false, // Assuming discount may not always be applicable
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum:['pending' , 'delivered' , 'rejected','cancelled'],
        default: 'pending',  // Default status is 'pending' when order is created.
    },
}, {
    timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
});

const Order = model<IOrder, OrderModel>('Order', orderSchema)
export default Order;