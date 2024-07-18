import { type Order, type OrderWithIds } from '@/domain'
import {
  type IValidation,
  type IHTTPRequest,
  type IAddOrder
} from '@/core'
import { AddOrderController } from '@/adapters/controllers'
import { badRequest, noContent, serverError } from '@/adapters/helpers'

const mockOrderWithIds = (): OrderWithIds => ({
  number: 1234,
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
})

const mockRequest = (): IHTTPRequest => ({
  body: mockOrderWithIds()
})

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockAddOrder = (): IAddOrder => {
  class AddOrderStub implements IAddOrder {
    async execute (order: Order): Promise<void> {
      return await Promise.resolve(null)
    }
  }
  return new AddOrderStub()
}

type SutTypes = {
  sut: AddOrderController
  addOrderStub: IAddOrder
  validationStub: IValidation
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addOrderStub = mockAddOrder()
  const sut = new AddOrderController(validationStub, addOrderStub)
  return {
    sut,
    validationStub,
    addOrderStub
  }
}

describe('AddOrderController', () => {
  test('Should call IValidation Usecase with a correct values ', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call IAddOrder with correct values', async () => {
    const { sut, addOrderStub } = mockSut()
    const addOrderSpy = jest.spyOn(addOrderStub, 'execute')
    const request = mockRequest()
    await sut.handle(request)
    expect(addOrderSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 500 if IAddOrder throws', async () => {
    const { sut, addOrderStub } = mockSut()
    jest.spyOn(addOrderStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 if Order is successfully created', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
