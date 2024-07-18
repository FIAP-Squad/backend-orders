import { type Product } from '@/domain'
import { type IAddProduct, type IAddProductRepository } from '@/core'

export class AddProduct implements IAddProduct {
  constructor (private readonly _repository: IAddProductRepository) { }
  async execute (params: Product): Promise<void> {
    await this._repository.add(params)
  }
}
