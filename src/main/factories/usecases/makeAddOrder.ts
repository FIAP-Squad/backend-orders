import { type IAddOrder } from '@/core'
import { AddOrder } from '@/usecases'
import { OrderRepository, PaymentRepository } from '@/adapters/repositories'

export const makeAddOrder = (): IAddOrder => {
  const command = new OrderRepository()
  const transaction = new PaymentRepository()
  return new AddOrder(command, transaction)
}
