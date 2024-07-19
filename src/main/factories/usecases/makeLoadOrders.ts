import { type ILoadOrders } from '@/core'
import { LoadOrders } from '@/usecases'
import { OrderRepository, PaymentRepository } from '@/adapters/repositories'

export const makeLoadOrders = (): ILoadOrders => {
  const command = new OrderRepository()
  const transaction = new PaymentRepository()
  return new LoadOrders(command, transaction)
}
