interface Variant {
  name: string
  price: number
}

interface ProductInterface {
  name: string
  slug: string
  photos: string[]
  description: string
  metaKey: string
  price: number
  discount: number
  stockStatus: boolean
  status: 'active' | 'inactive' // Assuming status can be 'active' or 'inactive'
  categories: string
  variants: Variant[]
}
export default ProductInterface
