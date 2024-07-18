import {
  badRequest,
  noContent,
  serverError
} from '@/adapters/helpers'
import {
  type IController,
  type IValidation,
  type IHTTPRequest,
  type IHTTPResponse,
  type IAddProduct
} from '@/core'

export class AddProductController implements IController {
  constructor (
    private readonly _validation: IValidation,
    private readonly _usecase: IAddProduct
  ) { }

  async handle ({ body }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this._validation.validate(body)
      if (error) return badRequest(error)
      const { category, name, price, description, image } = body
      await this._usecase.execute({ category, name, price, description, image })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
