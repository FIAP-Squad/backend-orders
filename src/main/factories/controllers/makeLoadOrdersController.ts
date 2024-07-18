import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadOrders } from '@/main/factories/usecases'
import { type IController } from '@/core'
import { LoadOrdersController } from '@/adapters/controllers'

export const makeLoadOrdersController = (): IController => {
  const controller = new LoadOrdersController(makeDbLoadOrders())
  return makeLogControllerDecorator(controller)
}
