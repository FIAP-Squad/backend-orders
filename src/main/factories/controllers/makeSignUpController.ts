import { makeSignUpValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAuthentication, makeDbAddAccount } from '@/main/factories/usecases'
import { type IController } from '@/core'
import { SignUpController } from '@/adapters/controllers/SignUpController'

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
