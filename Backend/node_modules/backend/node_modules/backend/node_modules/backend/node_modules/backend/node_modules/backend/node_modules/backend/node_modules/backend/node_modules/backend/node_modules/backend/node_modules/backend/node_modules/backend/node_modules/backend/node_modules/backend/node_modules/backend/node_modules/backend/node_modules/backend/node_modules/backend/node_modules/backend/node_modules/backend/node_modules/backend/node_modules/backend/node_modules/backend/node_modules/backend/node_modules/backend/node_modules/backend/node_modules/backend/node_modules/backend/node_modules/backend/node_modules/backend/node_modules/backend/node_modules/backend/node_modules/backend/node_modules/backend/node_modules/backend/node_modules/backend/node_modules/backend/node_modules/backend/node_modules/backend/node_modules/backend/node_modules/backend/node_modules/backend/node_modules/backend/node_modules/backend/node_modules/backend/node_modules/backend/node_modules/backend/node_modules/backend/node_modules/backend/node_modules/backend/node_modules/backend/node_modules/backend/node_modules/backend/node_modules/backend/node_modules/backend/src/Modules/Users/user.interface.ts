import {ObjectId}  from 'mongodb'
export type Role = 'super admin' | 'admin' | 'user';

export type IUser = {
    _id?:ObjectId
    name: string;
    email: string;
    password: string;
    photo: string;
    role: Role,
    verified:boolean
}