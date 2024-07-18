import { type Product } from '@/domain'

export type UpdateProductParamsRepository = {
  id: string
  body: Partial<Product>
}

export interface IUpdateProductRepository {
  update: (params: UpdateProductParamsRepository) => Promise<void>
}
