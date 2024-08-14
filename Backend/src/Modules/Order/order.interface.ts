export type Status = 'pending' | 'delivered' | 'rejected' | 'cancelled';

export interface IOrder {
    carts: Array<Object>
    division: String 
    district: String 
    sub_district: String 
    address: String 
    name: String 
    phone: String 
    total_price: Number
    total_discount: Number
    email: String
    status: Status 
}