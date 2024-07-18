import { makeDbUpdateProduct } from '@/main/factories/usecases'
import { makeUpdateProductValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateProductController } from '@/adapters/controllers'
import { type IController } from '@/core'

export const makeUpdateProductController = (): IController => {
  const controller = new UpdateProductController(makeUpdateProductValidation(), makeDbUpdateProduct())
  return makeLogControllerDecorator(controller)
}
