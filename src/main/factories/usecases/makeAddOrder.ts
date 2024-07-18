import { OrderRepository, PaymentRepository } from '@/adapters/repositories'
import { type IAddOrder } from '@/core'
import { AddOrder } from '@/usecases'

export const makeDbAddOrder = (): IAddOrder => {
  const orderRepository = new OrderRepository()
  const paymentRepository = new PaymentRepository()
  return new AddOrder(orderRepository, paymentRepository)
}
