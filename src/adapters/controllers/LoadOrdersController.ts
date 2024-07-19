import {
  ok,
  noContent,
  serverError
} from '@/adapters/helpers'
import {
  type IHTTPRequest,
  type IController,
  type IHTTPResponse,
  type ILoadOrders
} from '@/core'

export class LoadOrdersController implements IController {
  constructor (private readonly _service: ILoadOrders) { }
  async handle ({ query }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const filter = query ? { ...query } : {}
      const orders = await this._service.execute(filter)
      return (orders.length > 0) ? ok(orders) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
