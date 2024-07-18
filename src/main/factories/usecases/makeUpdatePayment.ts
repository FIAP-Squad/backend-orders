import { type IUpdatePayment } from '@/core'
import { PaymentRepository } from '@/adapters/repositories'
import { UpdatePayment } from '@/usecases'

export const makeUpdatePayment = (): IUpdatePayment => {
  const repository = new PaymentRepository()
  return new UpdatePayment(repository)
}
