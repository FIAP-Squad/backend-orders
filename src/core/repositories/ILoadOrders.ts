import { type WithId, type Order } from '@/domain'

export interface ILoadOrdersRepository {
  loadAll: (filter: any) => Promise<Array<WithId<Order>>>
}
