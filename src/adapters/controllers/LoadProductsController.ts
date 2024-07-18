import {
  ok,
  noContent,
  serverError
} from '@/adapters/helpers'
import {
  type IHTTPRequest,
  type IController,
  type IHTTPResponse,
  type ILoadProducts
} from '@/core'

export class LoadProductsController implements IController {
  constructor (private readonly _service: ILoadProducts) { }
  async handle ({ query }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const filter = query ? { ...query } : {}
      const products = await this._service.execute(filter)
      return (products.length > 0) ? ok(products) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
