import {
  ok,
  badRequest,
  serverError,
  unauthorized
} from '@/adapters/helpers'
import {
  type IController,
  type IValidation,
  type IHTTPRequest,
  type IHTTPResponse,
  type IAuthentication
} from '@/core'

export class LoginController implements IController {
  constructor (
    private readonly _usecase: IAuthentication,
    private readonly _validation: IValidation
  ) { }

  async handle ({ body }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this._validation.validate(body)
      if (error) return badRequest(error)
      const { email, password } = body
      const accessToken = await this._usecase.execute({ email, password })
      if (!accessToken) return unauthorized()
      return ok({ access_token: accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
