import { LoadOrders } from '@/usecases'
import { type ILoadPaymentsRepository, type ILoadOrders, type ILoadOrdersRepository } from '@/core'
import { type WithId, type Order, type Payment } from '@/domain'

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
}]
)

const mockPayments = (): Payment[] => (
  [{
    amount: 2000,
    status: 'any_status',
    orderId: 'any_orderId'
  }]
)

const mockOrdersRepository = (): ILoadOrdersRepository => {
  class LoadOrdersRepositoryStub implements ILoadOrdersRepository {
    async loadAll (): Promise<Array<WithId<Order>>> {
      return await Promise.resolve(mockOrders())
    }
  }
  return new LoadOrdersRepositoryStub()
}

const mockPaymentsRepository = (): ILoadPaymentsRepository => {
  class LoadPaymentsRepositoryStub implements ILoadPaymentsRepository {
    async loadAll (): Promise<Payment[]> {
      return await Promise.resolve(mockPayments())
    }
  }
  return new LoadPaymentsRepositoryStub()
}

interface SutTypes {
  sut: ILoadOrders
  loadOrdersRepositoryStub: ILoadOrdersRepository
  loadPaymentsRepositoryStub: ILoadPaymentsRepository
}

const mockSut = (): SutTypes => {
  const loadOrdersRepositoryStub = mockOrdersRepository()
  const loadPaymentsRepositoryStub = mockPaymentsRepository()
  const sut = new LoadOrders(loadOrdersRepositoryStub, loadPaymentsRepositoryStub)
  return {
    sut,
    loadOrdersRepositoryStub,
    loadPaymentsRepositoryStub
  }
}

describe('LoadOrders', () => {
  test('Should call ILoadOrdersRepository', async () => {
    const { sut, loadOrdersRepositoryStub } = mockSut()
    const loadAllSpy = jest.spyOn(loadOrdersRepositoryStub, 'loadAll')
    await sut.execute({})
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should call ILoadPaymentsRepository', async () => {
    const { sut, loadOrdersRepositoryStub, loadPaymentsRepositoryStub } = mockSut()
    jest.spyOn(loadOrdersRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.resolve(mockOrders()))
    const loadAllSpy = jest.spyOn(loadPaymentsRepositoryStub, 'loadAll')
    await sut.execute({})
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Orders on success', async () => {
    const { sut } = mockSut()
    const orders = await sut.execute({})
    expect(orders).toEqual(mockOrders())
  })

  test('Should throw if ILoadOrdersRepository throws', async () => {
    const { sut, loadOrdersRepositoryStub } = mockSut()
    jest.spyOn(loadOrdersRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute({})
    await expect(promise).rejects.toThrow()
  })
})
