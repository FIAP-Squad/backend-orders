import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadProducts } from '@/main/factories/usecases'
import { type IController } from '@/core'
import { LoadProductsController } from '@/adapters/controllers'

export const makeLoadProductsController = (): IController => {
  const controller = new LoadProductsController(makeDbLoadProducts())
  return makeLogControllerDecorator(controller)
}
