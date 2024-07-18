import {
  noContent,
  serverError
} from '@/adapters/helpers'
import {
  type IController,
  type IHTTPResponse,
  type IDeleteProduct,
  type IHTTPRequest
} from '@/core'

export class DeleteProductController implements IController {
  constructor (private readonly _usecase: IDeleteProduct) { }
  async handle ({ params }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const { id } = params
      await this._usecase.execute(id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
