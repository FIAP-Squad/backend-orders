import { type Product } from '@/domain'
import { type ILoadProducts, type ILoadProductsRepository } from '@/core'

export class LoadProducts implements ILoadProducts {
  constructor (private readonly _repository: ILoadProductsRepository) { }
  async execute (filter: any): Promise<Product[]> {
    return await this._repository.loadAll(filter)
  }
}
