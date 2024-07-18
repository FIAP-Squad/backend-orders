import { type IValidation, type IController, type IHTTPResponse, type IHTTPRequest } from '@/core'
import { badRequest } from '@/adapters/helpers'

export class AddOrderController implements IController {
  constructor (private readonly _validation: IValidation) { }
  async handle ({ body }: IHTTPRequest): Promise<IHTTPResponse> {
    const error = this._validation.validate(body)
    if (error) return badRequest(error)
  }
}
