import { CartItem } from './cart'

export interface AddToCartData {
  userId: string
  cartItem: CartItem
}

export interface CartUpdateData {
  userId: string
  cartItemId: string
  amount: number
}
