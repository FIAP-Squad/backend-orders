import {
  type IAddOrder,
  type IHTTPRequest,
  type IValidation
} from '@/core'
import { AddOrderController } from '@/adapters/controllers'
import {
  badRequest,
  noContent,
  serverError
  // noContent
} from '@/adapters/helpers'

import { type Order } from '@/domain'

const morkOrder = (): Order => ({
  customer: 'any_customer',
  status: 'any_status',
  amount: 2000,
  items: [
    {
      unitPrice: 2000,
      amount: 2000,
      orderId: 'any_orderId',
      productId: 'any_productId'

    }
  ]
})

const mockRequest = (): IHTTPRequest => ({
  body: morkOrder()
})

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  const validationStub = new ValidationStub()
  return validationStub
}

const makeAddOrder = (): IAddOrder => {
  class AddOrderStub implements IAddOrder {
    async execute (data: Order): Promise<void> {
      return await Promise.resolve()
    }
  }
  const addOrderStub = new AddOrderStub()
  return addOrderStub
}

interface SutTypes {
  sut: AddOrderController
  validationStub: IValidation
  addOrderStub: IAddOrder
}

const mockSut = (): SutTypes => {
  const addOrderStub = makeAddOrder()
  const validationStub = mockValidation()
  const sut = new AddOrderController(validationStub, addOrderStub)
  return {
    sut,
    validationStub,
    addOrderStub
  }
}

describe('Add Order IController', () => {
  test('Should call IValidation with correct values ', async () => {
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

  test('Should call IAddOrder usign correct values', async () => {
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

  test('Should return 204 on success', async () => {
    const { sut, addOrderStub } = mockSut()
    jest.spyOn(addOrderStub, 'execute')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
