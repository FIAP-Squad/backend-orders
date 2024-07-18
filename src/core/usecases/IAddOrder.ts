import { type Order } from '@/domain'

export interface IAddOrder {
  execute: (params: Order) => Promise<void>
}
