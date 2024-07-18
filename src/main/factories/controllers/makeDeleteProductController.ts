import { makeDbDeleteProduct } from '@/main/factories/usecases/'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { type IController } from '@/core'
import { DeleteProductController } from '@/adapters/controllers'

export const makeDeleteProductController = (): IController => {
  const controller = new DeleteProductController(makeDbDeleteProduct())
  return makeLogControllerDecorator(controller)
}
