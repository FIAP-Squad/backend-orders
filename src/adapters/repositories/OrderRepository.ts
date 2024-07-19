import { prismaClient } from '@/adapters/repositories/prismaClient'
import { type OrderItem, type OrdersDTO, type Order, type WithId } from '@/domain'
import {
  type ILoadOrdersRepository,
  type IAddOrderRepository
} from '@/core'

export class OrderRepository implements IAddOrderRepository, ILoadOrdersRepository {
  async add (params: Order): Promise<string> {
    const { items, payment, ...order } = params
    const { id } = await prismaClient.order.create({
      data: {
        ...order,
        items: {
          create: items.map((item: OrderItem) => ({ ...item }))
        }
      }
    })
    return id
  }

  async loadAll (filter: any): Promise<Array<WithId<OrdersDTO>>> {
    return await prismaClient.order.findMany({
      where: filter,
      select: {
        id: true,
        customer: true,
        status: true,
        amount: true,
        items: {
          select: {
            totalItems: true,
            unitPrice: true,
            amount: true,
            orderId: true,
            productId: true
          }
        }
      }
    })
  }
}
