import { type WithId, type Order, type OrderWithIds } from '@/domain'
import { type ILoadOrders, type ILoadOrdersRepository } from '@/core'
import { LoadOrders } from '@/usecases'

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
      }
    ],
    status: 'any_status',
    amount: 4000
  },
  {
    id: 'other_id',
    number: 2,
    payment: {
      status: 'other_status',
      orderId: 'other_orderId',
      amount: 4000
    },
    customer: 'other_customer',
    items: [
      {
        productId: 'other_product_id',
        totalItems: 2,
        unitPrice: 2000,
        amount: 4000
      }
    ],
    status: 'other_status',
    amount: 4000
  }
])

const mockOrdersRepository = (): ILoadOrdersRepository => {
  class LoadOrdersRepositoryStub implements ILoadOrdersRepository {
    async loadAll (): Promise<Array<WithId<Order>>> {
      return await Promise.resolve(mockOrderWithIds())
    }
  }
  return new LoadOrdersRepositoryStub()
}

interface SutTypes {
  sut: ILoadOrders
  loadOrdersRepositoryStub: ILoadOrdersRepository
}

const mockSut = (): SutTypes => {
  const loadOrdersRepositoryStub = mockOrdersRepository()
  const sut = new LoadOrders(loadOrdersRepositoryStub)
  return {
    sut,
    loadOrdersRepositoryStub
  }
}

describe('ILoadOrders Usecase', () => {
  test('Should call ILoadOrdersRepository', async () => {
    const { sut, loadOrdersRepositoryStub } = mockSut()
    const loadAllSpy = jest.spyOn(loadOrdersRepositoryStub, 'loadAll')
    await sut.execute({})
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Orders on success', async () => {
    const { sut } = mockSut()
    const orders = await sut.execute({})
    expect(orders).toEqual(mockOrderWithIds())
  })

  test('Should throw if ILoadOrdersRepository throws', async () => {
    const { sut, loadOrdersRepositoryStub } = mockSut()
    jest.spyOn(loadOrdersRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute({})
    await expect(promise).rejects.toThrow()
  })
})
