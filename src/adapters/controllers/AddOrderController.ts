import {
  type IHTTPResponse,
  type IController,
  type IValidation,
  type IAddOrder,
  type IHTTPRequest
} from '@/core'
import { badRequest, noContent, serverError } from '../helpers'

export class AddOrderController implements IController {
  constructor (
    private readonly _validation: IValidation,
    private readonly _usecase: IAddOrder
  ) { }

  async handle ({ body }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this._validation.validate(body)
      if (error) return badRequest(error)
      await this._usecase.execute(body)
      return noContent()
    } catch (error) { return serverError(error) }
  }
}
