import { prismaClient } from '@/adapters/repositories/prismaClient'
import {
  type OrderWithIds,
  type Order,
  type WithId
} from '@/domain'
import {
  type IUpdateOrderRepository,
  type IAddOrderRepository,
  type ILoadOrdersRepository,
  type UpdateOrderParams
} from '@/core'

export class OrderRepository implements IAddOrderRepository, IUpdateOrderRepository, ILoadOrdersRepository {
  async addOrder (params: OrderWithIds): Promise<string> {
    const { items, payment, ...order } = params
    const { id } = await prismaClient.order.create({
      data: {
        ...order,
        items: {
          createMany: {
            data: items
          }
        }
      }
    })
    return id
  }

  async updateOrder (params: UpdateOrderParams): Promise<void> {
    const { id, status } = params
    await prismaClient.order.update({ where: { id }, data: { status } })
  }

  async loadAll (filter: any): Promise<Array<WithId<Order>>> {
    return await prismaClient.order.findMany({
      where: filter,
      select: {
        id: true,
        number: true,
        customer: true,
        status: true,
        amount: true,
        payment: {
          select: {
            amount: true,
            status: true,
            orderId: true
          }
        },
        items: {
          select: {
            amount: true,
            product: {
              select: {
                name: true,
                price: true,
                description: true,
                image: true
              }
            },
            totalItems: true,
            unitPrice: true
          }
        }
      }
    })
  }
}
