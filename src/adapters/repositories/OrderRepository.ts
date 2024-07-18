import { prismaClient } from '@/adapters/repositories/prismaClient'
import { OrderItem, type Order } from '@/domain'
import {
  type IAddOrderRepository
} from '@/core'

export class OrderRepository implements IAddOrderRepository {
  async add (params: Order): Promise<string> {
    console.log(params)
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
}
