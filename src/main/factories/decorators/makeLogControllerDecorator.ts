import { LogRepository } from '@/adapters/repositories'
import { LogControllerDecorator } from '@/main/decorators'
import { type IController } from '@/core'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logRepository = new LogRepository()
  return new LogControllerDecorator(controller, logRepository)
}
