import { type Order } from '@/domain'

export interface IAddOrderRepository {
  add: (params: Order) => Promise<string>
}
