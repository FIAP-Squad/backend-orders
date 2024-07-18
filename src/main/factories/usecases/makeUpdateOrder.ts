import { type IUpdateOrder } from '@/core'
import { UpdateOrder } from '@/usecases'
import { OrderRepository } from '@/adapters/repositories'

export const makeDbUpdateOrder = (): IUpdateOrder => {
  const repository = new OrderRepository()
  return new UpdateOrder(repository)
}
