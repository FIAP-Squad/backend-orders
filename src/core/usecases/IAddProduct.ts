import { type Product } from '@/domain'

export interface IAddProduct {
  execute: (params: Product) => Promise<void>
}
