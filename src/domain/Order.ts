import { type Payment } from './Payment'

export type OrderItem = {
  totalItems: number
  unitPrice: number
  amount: number
  orderId: string
  productId: string
}

export type Order = {
  customer: string
  status: string
  amount: number
  items: OrderItem[]
  payment: Payment
}

export type OrdersDTO = Omit<Order, 'payment'>
