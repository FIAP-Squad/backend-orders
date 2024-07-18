import { type OrderWithIds } from '@/domain'

export interface IAddOrder {
  execute: (params: OrderWithIds) => Promise<void>
}
