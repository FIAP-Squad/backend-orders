import { type WithId, type Order } from '@/domain'
import { type ILoadPaymentsRepository, type ILoadOrders, type ILoadOrdersRepository } from '@/core'

export class LoadOrders implements ILoadOrders {
  constructor (
    private readonly _query: ILoadOrdersRepository,
    private readonly _transaction: ILoadPaymentsRepository
  ) { }

  async execute (filter: any): Promise<Array<WithId<Order>>> {
    const orders = await this._query.loadAll(filter)
    const payments = await this._transaction.loadAll({})
    return orders.map(order => {
      const orderPayment = payments.find(payment => payment.orderId === order.id)
      return {
        id: order.id,
        customer: order.customer,
        status: order.status,
        amount: order.amount,
        payment: {
          amount: orderPayment?.amount ?? 0,
          status: orderPayment?.status ?? 'Pendding',
          orderId: orderPayment?.orderId ?? ''
        },
        items: order.items.map(item => ({
          totalItems: item.totalItems,
          unitPrice: item.unitPrice,
          amount: item.amount,
          orderId: item.orderId,
          productId: item.productId
        }))
      }
    })
  }
}
