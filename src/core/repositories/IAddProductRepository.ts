import { type Product } from '@/domain'

export interface IAddProductRepository {
  add: (params: Product) => Promise<void>
}
