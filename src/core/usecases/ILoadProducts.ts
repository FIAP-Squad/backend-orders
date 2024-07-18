import { type Product } from '@/domain'

export interface ILoadProducts {
  execute: (filter: any) => Promise<Product[]>
}
