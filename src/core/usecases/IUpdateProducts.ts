import { type Product } from '@/domain'

export type UpdateProductParams = {
  id: string
  body: Partial<Product>
}

export interface IUpdateProduct {
  execute: (params: UpdateProductParams) => Promise<void>
}
