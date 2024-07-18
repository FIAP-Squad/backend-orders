import {
  type IHTTPRequest,
  type IHTTPResponse,
  type IController,
  type IValidation,
  type IUpdatePayment
} from '@/core'
import { badRequest, noContent, serverError } from '@/adapters/helpers'

export class UpdatePaymentController implements IController {
  constructor (
    private readonly _validation: IValidation,
    private readonly _usecase: IUpdatePayment
  ) { }

  async handle ({ body, params }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this._validation.validate(body)
      if (error) return badRequest(error)
      const { id } = params
      await this._usecase.execute({ id, body })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
