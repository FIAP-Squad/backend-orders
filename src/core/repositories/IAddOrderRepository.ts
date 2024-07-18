import { type OrderWithIds } from '@/domain'
export interface IAddOrderRepository {
  addOrder: (params: OrderWithIds) => Promise<string>
}
