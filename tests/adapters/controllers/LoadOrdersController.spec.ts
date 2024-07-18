import { type WithId, type Order, type OrderWithIds } from '@/domain'
import { type ILoadOrders, type IHTTPRequest } from '@/core'
import { LoadOrdersController } from '@/adapters/controllers'
import { noContent, serverError } from '@/adapters/helpers'

const mockOrderWithIds = (): Array<WithId<OrderWithIds>> => ([
  {
    id: 'any_id',
    number: 1,
    payment: {
      status: 'any_status',
      orderId: 'any_orderId',
      amount: 4000
    },
    customer: 'any_customer',
    items: [
      {
        productId: 'any_product_id',
        totalItems: 2,
        unitPrice: 2000,
        amount: 4000
      },
      {
        productId: 'other_product_id',
        totalItems: 3,
        unitPrice: 6000,
        amount: 6000
      }
    ],
    status: 'any_status',
    amount: 4000
  }
])

const mockRequest = (): IHTTPRequest => ({
  query: {
    status: 'any_status'
  }
})

const mockLoadOrderStub = (): ILoadOrders => {
  class LoadOrdersStub implements ILoadOrders {
    async execute (): Promise<Array<WithId<Order>>> {
      return await Promise.resolve(mockOrderWithIds())
    }
  }
  return new LoadOrdersStub()
}

interface SutType {
  sut: LoadOrdersController
  loadOrdersStub: ILoadOrders
}

const mockSut = (): SutType => {
  const loadOrdersStub = mockLoadOrderStub()
  const sut = new LoadOrdersController(loadOrdersStub)
  return {
    sut,
    loadOrdersStub
  }
}

describe('LoadOrder IController', () => {
  test('Should call ILoadOrders', async () => {
    const { sut, loadOrdersStub } = mockSut()
    const loadSpy = jest.spyOn(loadOrdersStub, 'execute')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledWith({})
  })

  test('Should return an order on success', async () => {
    const { sut, loadOrdersStub } = mockSut()
    jest.spyOn(loadOrdersStub, 'execute').mockReturnValueOnce(Promise.resolve([mockOrderWithIds()[1]]))
    const response = await sut.handle(mockRequest())
    expect(response.body.length).toEqual(1)
  })

  test('Should return 204 LoadOrder returns empty', async () => {
    const { sut, loadOrdersStub } = mockSut()
    jest.spyOn(loadOrdersStub, 'execute').mockReturnValueOnce(Promise.resolve([]))
    const response = await sut.handle({})
    expect(response).toEqual(noContent())
  })

  test('Should 500 if ILoadOrders throws', async () => {
    const { sut, loadOrdersStub } = mockSut()
    jest.spyOn(loadOrdersStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})
