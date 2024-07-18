import {
  type IHTTPResponse,
  type IController,
  type ILoadOrders,
  type IHTTPRequest
} from '@/core'
import { noContent, ok, serverError } from '@/adapters/helpers'

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
