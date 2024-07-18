import { type Payment } from '@/domain'

export type UpdatePaymentParamsRepository = {
  id: string
  body: Pick<Payment, 'status'>
}

export interface IUpdatePaymentRepository {
  update: (params: UpdatePaymentParamsRepository) => Promise<void>
}
