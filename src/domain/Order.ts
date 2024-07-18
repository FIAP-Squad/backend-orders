export type OrderItem = {
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
}
