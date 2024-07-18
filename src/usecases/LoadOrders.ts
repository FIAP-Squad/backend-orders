import { type WithId, type Order } from '@/domain'
import { type ILoadOrders, type ILoadOrdersRepository } from '@/core'

export class LoadOrders implements ILoadOrders {
  constructor (private readonly _repository: ILoadOrdersRepository) { }
  async execute (filter: any): Promise<Array<WithId<Order>>> {
    return await this._repository.loadAll(filter)
  }
}
