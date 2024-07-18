import { type UpdateOrderParams } from '@/core'

export interface IUpdateOrderRepository {
  updateOrder: (params: UpdateOrderParams) => Promise<void>
}
