import { makeUpdatePayment } from '@/main/factories/usecases'
import { makeUpdatePaymentValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdatePaymentController } from '@/adapters/controllers'
import { type IController } from '@/core'

export const makeUpdatePaymentController = (): IController => {
  const controller = new UpdatePaymentController(makeUpdatePaymentValidation(), makeUpdatePayment())
  return makeLogControllerDecorator(controller)
}
