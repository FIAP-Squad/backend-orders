import { type Payment, type OrderWithIds } from '@/domain'
import {
  type IAddPaymentRepository,
  type IAddOrderRepository
} from '@/core'
import { AddOrder } from '@/usecases'

const mockOrderWithIds = (): OrderWithIds => ({
  number: 1234,
  payment: {
    status: 'pendding',
    orderId: '',
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
})

const mockAddPaymentRepository = (): IAddPaymentRepository => {
  class AddPaymentRepositoryStub implements IAddPaymentRepository {
    async addPayment (params: Payment): Promise<void> {
      await Promise.resolve(null)
    }
  }
  const addPaymentRepositoryStub = new AddPaymentRepositoryStub()
  return addPaymentRepositoryStub
}

const mockAddOrderRepository = (): IAddOrderRepository => {
  class AddOrderRepositoryStub implements IAddOrderRepository {
    async addOrder (params: OrderWithIds): Promise<string> {
      return await Promise.resolve(null)
    }
  }
  const addOrderRepositoryStub = new AddOrderRepositoryStub()
  return addOrderRepositoryStub
}

type SutTypes = {
  sut: AddOrder
  addOrderRepositoryStub: IAddOrderRepository
  addPaymentRepositoryStub: IAddPaymentRepository
}

const mockSut = (): SutTypes => {
  const addOrderRepositoryStub = mockAddOrderRepository()
  const addPaymentRepositoryStub = mockAddPaymentRepository()
  const sut = new AddOrder(addOrderRepositoryStub, addPaymentRepositoryStub)
  return {
    sut,
    addOrderRepositoryStub,
    addPaymentRepositoryStub
  }
}

describe('AddOrder Usecase', () => {
  test('Should call IAddOrderRepository usign correct values', async () => {
    const { sut, addOrderRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addOrderRepositoryStub, 'addOrder')
    const addOrderData = mockOrderWithIds()
    await sut.execute(addOrderData)
    expect(addSpy).toHaveBeenCalledWith(addOrderData)
  })

  test('Shoud throw Error if IHasher Throw Error', async () => {
    const { sut, addOrderRepositoryStub } = mockSut()
    jest.spyOn(addOrderRepositoryStub, 'addOrder').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(mockOrderWithIds())
    await expect(promise).rejects.toThrow()
  })

  test('Ensure AddPaymentRepository is called with correct values', async () => {
    const { sut, addOrderRepositoryStub, addPaymentRepositoryStub } = mockSut()
    jest.spyOn(addOrderRepositoryStub, 'addOrder').mockReturnValueOnce(Promise.resolve('any_orderId'))
    const addPaymentStub = jest.spyOn(addPaymentRepositoryStub, 'addPayment')
    const order = mockOrderWithIds()
    await sut.execute(order)
    expect(addPaymentStub).toHaveBeenCalledWith({
      status: 'pendding',
      orderId: 'any_orderId',
      amount: 4000
    })
  })
})
