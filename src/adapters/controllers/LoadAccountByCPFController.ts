import {
  ok,
  notFound,
  serverError
} from '@/adapters/helpers'
import {
  type IHTTPRequest,
  type IController,
  type IHTTPResponse,
  type ILoadAccountByCPF
} from '@/core'

export class LoadAccountByCPFController implements IController {
  constructor (private readonly _service: ILoadAccountByCPF) { }
  async handle ({ params }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const { cpf } = params
      const account = await this._service.execute(cpf)
      if (!account) return notFound()
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
