import { type WithId, type Order, type OrdersDTO } from '@/domain'

export interface ILoadOrdersRepository {
  loadAll: (filter: any) => Promise<Array<WithId<OrdersDTO>>>
}