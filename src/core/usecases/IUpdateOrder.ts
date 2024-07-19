import { type Order } from '@/domain'

export type UpdateOrderParams = {
  id: string
  body: Partial<Order>
}

export interface IUpdateOrder {
  execute: (params: UpdateOrderParams) => Promise<void>
}
