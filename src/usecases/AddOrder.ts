import { type OrderWithIds } from '@/domain'
import {
  type IAddPaymentRepository,
  type IAddOrderRepository,
  type IAddOrder
} from '@/core'

export class AddOrder implements IAddOrder {
  constructor (
    private readonly _orderRepository: IAddOrderRepository,
    private readonly _paymentRepository: IAddPaymentRepository
  ) { }

  async execute (params: OrderWithIds): Promise<void> {
    const orderId = await this._orderRepository.addOrder(params)
    const { payment } = params
    payment.orderId = orderId
    await this._paymentRepository.addPayment(payment)
  }
}
