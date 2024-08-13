interface Variant {
    name: string;
    price: number;
}

interface IProduct extends Document {
    name: string;
    slug: string;
    photos: string[];
    description: string;
    metaKey: string;
    price: number;
    discount: number;
    stockStatus: boolean;
    status: 'active' | 'inactive';
    categories: string;
    variants: Variant[];
}

export default IProduct;