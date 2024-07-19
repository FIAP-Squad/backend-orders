import { type WithId, type Order } from '@/domain'

export interface ILoadOrders {
  execute: (filter: any) => Promise<Array<WithId<Order>>>
}
