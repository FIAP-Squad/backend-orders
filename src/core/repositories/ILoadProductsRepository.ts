import { type Product } from '@/domain'

export interface ILoadProductsRepository {
  loadAll: (filter: any) => Promise<Product[]>
}
