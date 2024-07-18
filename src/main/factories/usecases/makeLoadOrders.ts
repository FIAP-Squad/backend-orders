import { type ILoadOrders } from '@/core'
import { LoadOrders } from '@/usecases'
import { OrderRepository } from '@/adapters/repositories'

export const makeDbLoadOrders = (): ILoadOrders => {
  const repository = new OrderRepository()
  return new LoadOrders(repository)
}
