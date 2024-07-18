import {
  type UpdateOrderParams,
  type IUpdateOrder,
  type IUpdateOrderRepository
} from '@/core'

export class UpdateOrder implements IUpdateOrder {
  constructor (private readonly _repository: IUpdateOrderRepository) { }
  async execute (params: UpdateOrderParams): Promise<void> {
    await this._repository.updateOrder(params)
  }
}
