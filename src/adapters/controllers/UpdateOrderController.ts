import {
  type IHTTPResponse,
  type IController,
  type IValidation,
  type IHTTPRequest,
  type IUpdateOrder
} from '@/core'
import { badRequest, noContent, serverError } from '../helpers'

export class UpdateOrderController implements IController {
  constructor (
    private readonly _validation: IValidation,
    private readonly _usecase: IUpdateOrder
  ) { }

  async handle ({ body, params }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this._validation.validate(body)
      if (error) return badRequest(error)
      const { id } = params
      const { status } = body
      await this._usecase.execute({ id, status })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
