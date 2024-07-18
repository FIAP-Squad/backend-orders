import { DeleteProduct } from '@/usecases'
import { type IDeleteProduct } from '@/core'
import { ProductRepository } from '@/adapters/repositories'

export const makeDbDeleteProduct = (): IDeleteProduct => {
  const repository = new ProductRepository()
  return new DeleteProduct(repository)
}
