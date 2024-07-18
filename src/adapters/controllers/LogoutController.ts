import {
  type ILogout,
  type IHTTPResponse,
  type IController,
  type IValidation,
  type IHTTPRequest
} from '@/core'
import { badRequest, noContent, serverError } from '@/adapters/helpers'

export class LogoutController implements IController {
  constructor (
    private readonly _validation: IValidation,
    private readonly _service: ILogout
  ) { }

  async handle ({ body }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this._validation.validate(body)
      if (error) return badRequest(error)
      const { email } = body
      await this._service.execute(email)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
