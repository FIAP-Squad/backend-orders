import { makeLoadOrders } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LoadOrdersController } from '@/adapters/controllers'
import { type IController } from '@/core'

export const makeLoadOrdersController = (): IController => {
  const controller = new LoadOrdersController(makeLoadOrders())
  return makeLogControllerDecorator(controller)
}
