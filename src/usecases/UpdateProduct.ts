import {
  type UpdateProductParams,
  type IUpdateProduct,
  type IUpdateProductRepository
} from '@/core'

export class UpdateProduct implements IUpdateProduct {
  constructor (private readonly _repository: IUpdateProductRepository) { }
  async execute (params: UpdateProductParams): Promise<void> {
    await this._repository.update(params)
  }
}
