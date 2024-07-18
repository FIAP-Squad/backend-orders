import { type IUpdateProduct } from '@/core'
import { UpdateProduct } from '@/usecases'
import { ProductRepository } from '@/adapters/repositories'

export const makeDbUpdateProduct = (): IUpdateProduct => {
  const repository = new ProductRepository()
  return new UpdateProduct(repository)
}
