import { Dispatch, SetStateAction } from 'react'

export type Children = {
  children: React.ReactNode
}

export type Data<T> = {
  data: T
}

export type SidebarProps = {
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,
  isMobile?: boolean
}

export type TableProps = Children & {
  head: Array<string>,
  isEmpty?: boolean | false
}

export type ListProps = {
  total: number
  skip: number
  limit: number
}

export type ProductProps = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: Array<string>
}

export type CartProps = {
  id: number
  discountedTotal: number
  total: number
  totalProducts: number
  totalQuantity: number
  userId: number
  products: Array<CartProductProps>
}

export type CartProductProps = {
  id: number
  title: string
  discountPercentage: number
  discountedPrice: number
  price: number
  quantity: number
  total: number
}

export type ProductsProps = ListProps & {
  products: Array<ProductProps>
}

export type CartsProps = ListProps & {
  carts: Array<CartProps>
}

export type CategoriesProps = Array<string>
