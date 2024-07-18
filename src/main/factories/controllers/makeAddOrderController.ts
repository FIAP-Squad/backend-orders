import { makeDbAddOrder } from '@/main/factories/usecases'
import { makeAddOrderValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddOrderController } from '@/adapters/controllers'
import { type IController } from '@/core'

export const makeAddOrderController = (): IController => {
  const controller = new AddOrderController(makeAddOrderValidation(), makeDbAddOrder())
  return makeLogControllerDecorator(controller)
}
