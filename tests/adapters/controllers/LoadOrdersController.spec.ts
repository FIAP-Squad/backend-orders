import { type WithId, type Order } from '@/domain'
import { type ILoadOrders, type IHTTPRequest } from '@/core'
import { LoadOrdersController } from '@/adapters/controllers'
import {
  ok,
  noContent,
  serverError
} from '@/adapters/helpers'

const mockOrders = (): Array<WithId<Order>> => ([{
  id: 'any_orderId',
  customer: 'any_customer',
  status: 'any_status',
  amount: 2000,
  payment: {
    amount: 2000,
    status: 'any_status',
    orderId: 'any_orderId'
  },
  items: [
    {
      totalItems: 1,
      unitPrice: 2000,
      amount: 2000,
      orderId: 'any_orderId',
      productId: 'any_orderId'
    }
  ]
}])

const mockLoadOrders = (): ILoadOrders => {
  class LoadOrdersStub implements ILoadOrders {
    async execute (): Promise<Array<WithId<Order>>> {
      return await Promise.resolve(mockOrders())
    }
  }
  return new LoadOrdersStub()
}

const mockRequest = (): IHTTPRequest => ({
  query: {
    category: 'any_category'
  }
})

interface SutType {
  sut: LoadOrdersController
  loadOrdersStub: ILoadOrders
}

const mockSut = (): SutType => {
  const loadOrdersStub = mockLoadOrders()
  const sut = new LoadOrdersController(loadOrdersStub)
  return {
    sut,
    loadOrdersStub
  }
}

describe('ILoadOrders IController', () => {
  test('Should call ILoadOrders', async () => {
    const { sut, loadOrdersStub } = mockSut()
    const loadSpy = jest.spyOn(loadOrdersStub, 'execute')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledWith({})
  })

  test('Should return 200 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle({})
    expect(response).toEqual(ok(mockOrders()))
  })

  test('Should return a order on success', async () => {
    const { sut, loadOrdersStub } = mockSut()
    jest.spyOn(loadOrdersStub, 'execute').mockReturnValueOnce(Promise.resolve([mockOrders()[1]]))
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
