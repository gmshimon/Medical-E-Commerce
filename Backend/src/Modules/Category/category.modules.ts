import { Model, model, Schema } from 'mongoose';
import validator  from 'validator';
import ICategory from './category.interface';

type CategoryModel = Model<ICategory,object>

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: [true, 'Please provide the category name'],
        unique: true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    },
    thumbnail:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
})

const Category = model<ICategory, CategoryModel>("Category", categorySchema)

export default Category;

