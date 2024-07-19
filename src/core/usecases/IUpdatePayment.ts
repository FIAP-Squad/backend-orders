import { type Payment } from '@/domain'

export type UpdatePaymentParams = {
  id: string
  body: Pick<Payment, 'status'>
}

export interface IUpdatePayment {
  execute: (params: UpdatePaymentParams) => Promise<void>
}
