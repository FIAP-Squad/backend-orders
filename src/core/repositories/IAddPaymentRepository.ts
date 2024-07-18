import { type Payment } from '@/domain'

export interface IAddPaymentRepository {
  addPayment: (params: Payment) => Promise<void>
}
