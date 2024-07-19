import { type Order } from '@/domain'
import {
  type IAddPaymentRepository,
  type IAddOrder,
  type IAddOrderRepository
} from '@/core'

export class AddOrder implements IAddOrder {
  constructor (
    private readonly _command: IAddOrderRepository,
    private readonly _transaction: IAddPaymentRepository
  ) { }

  async execute (params: Order): Promise<void> {
    const orderId = await this._command.add(params)
    await this._transaction.addPayment({ amount: 0, status: 'Pendding', orderId })
  }
}
