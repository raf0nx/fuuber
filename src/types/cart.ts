import { Food } from './food'

export interface CartItem extends Food {
  amount: number
}
