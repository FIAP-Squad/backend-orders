import { type Order } from '@/domain'

export type UpdateOrderParamsRepository = {
  id: string
  body: Partial<Order>
}

export interface IUpdateOrderRepository {
  update: (params: UpdateOrderParamsRepository) => Promise<void>
}
