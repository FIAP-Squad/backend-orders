import { type Payment } from '@/domain'

export interface ILoadPaymentsRepository {
  loadAll: (filter: any) => Promise<Payment[]>
}
