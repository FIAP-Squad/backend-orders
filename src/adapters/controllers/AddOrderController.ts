import {
  type IValidation,
  type IController,
  type IHTTPResponse,
  type IHTTPRequest,
  type IAddOrder
} from '@/core'
import { badRequest, noContent, serverError } from '@/adapters/helpers'

export class AddOrderController implements IController {
  constructor (
    private readonly _validation: IValidation,
    private readonly _usecase: IAddOrder
  ) { }

  async handle ({ body }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this._validation.validate(body)
      if (error) return badRequest(error)
      const { customer, amount, status, items } = body
      await this._usecase.execute({ customer, amount, status, items })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
