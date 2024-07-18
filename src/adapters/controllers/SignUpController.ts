import {
  ok,
  forbidden,
  badRequest,
  serverError
} from '@/adapters/helpers'
import {
  type IController,
  type IValidation,
  type IHTTPRequest,
  type IHTTPResponse,
  type IAddAccount,
  type IAuthentication
} from '@/core'
import { EmailInUse } from '../errors'

export class SignUpController implements IController {
  constructor (
    private readonly _usecase: IAddAccount,
    private readonly _validation: IValidation,
    private readonly _applicationService: IAuthentication
  ) { }

  async handle ({ body }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this._validation.validate(body)
      if (error) return badRequest(error)
      const { name, cpf, email, password, role } = body
      const account = await this._usecase.execute({
        name,
        cpf,
        email,
        password,
        role
      })
      if (!account) return forbidden(new EmailInUse())
      const accessToken = await this._applicationService.execute({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
