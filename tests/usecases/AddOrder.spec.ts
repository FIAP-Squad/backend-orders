import {
  type Payment,
  type Order
} from '@/domain'
import { AddOrder } from '@/usecases'
import {
  type IAddPaymentRepository,
  type IAddOrderRepository
} from '@/core'

const mockOrder = (): Order => ({
  customer: 'any_customer',
  status: 'any_status',
  amount: 2000,
  payment: {
    amount: 2000,
    status: 'Pendding',
    orderId: 'any_orderId'
  },
  items: [
    {
      unitPrice: 2000,
      amount: 2000,
      orderId: 'any_orderId',
      productId: 'any_productId'

    }
  ]
})

interface SutTypes {
  sut: AddOrder
  addOrderRepositoryStub: IAddOrderRepository
  addPaymentRepositoryStub: IAddPaymentRepository
}

const mockAddOrderRepository = (): IAddOrderRepository => {
  class AddOrderRepositoryStub implements IAddOrderRepository {
    async add (params: Order): Promise<string> {
      return await Promise.resolve('')
    }
  }
  const addOrderRepositoryStub = new AddOrderRepositoryStub()
  return addOrderRepositoryStub
}

const mockAddPaymentRepository = (): IAddPaymentRepository => {
  class AddPaymentRepositoryStub implements IAddPaymentRepository {
    async addPayment (params: Payment): Promise<void> {
      return await Promise.resolve()
    }
  }
  const addPaymentRepositoryStub = new AddPaymentRepositoryStub()
  return addPaymentRepositoryStub
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
    const addSpy = jest.spyOn(addOrderRepositoryStub, 'add')
    const addOrderData = mockOrder()
    await sut.execute(addOrderData)
    expect(addSpy).toHaveBeenCalledWith(addOrderData)
  })

  test('Should call IAddPaymentRepository usign correct values', async () => {
    const { sut, addOrderRepositoryStub, addPaymentRepositoryStub } = mockSut()
    jest.spyOn(addOrderRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve('any_orderId'))
    const addSpy = jest.spyOn(addPaymentRepositoryStub, 'addPayment')
    const addPaymentData = mockOrder()
    const payment = { amount: 0, status: 'Pendding', orderId: 'any_orderId' }
    await sut.execute(addPaymentData)
    expect(addSpy).toHaveBeenCalledWith(payment)
  })

  test('Shoud throw Error if repository throws', async () => {
    const { sut, addOrderRepositoryStub } = mockSut()
    jest.spyOn(addOrderRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(mockOrder())
    await expect(promise).rejects.toThrow()
  })
})
