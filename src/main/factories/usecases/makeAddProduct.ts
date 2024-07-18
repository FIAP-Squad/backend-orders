import { type IAddProduct } from '@/core'
import { AddProduct } from '@/usecases'
import { ProductRepository } from '@/adapters/repositories'

export const makeDbAddProduct = (): IAddProduct => {
  const repository = new ProductRepository()
  return new AddProduct(repository)
}
