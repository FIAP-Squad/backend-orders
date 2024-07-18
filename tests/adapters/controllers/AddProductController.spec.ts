import {
  type IHTTPRequest,
  type IValidation,
  type IAddProduct
} from '@/core'
import { AddProductController } from '@/adapters/controllers'
import {
  badRequest,
  serverError,
  noContent
} from '@/adapters/helpers'
import { type Product } from '@/domain'

const mockProduct = (): Product => ({
  category: 'any_category',
  name: 'any_name',
  price: 1234,
  description: 'any_description',
  image: 'any_image'
})

const mockRequest = (): IHTTPRequest => ({
  body: mockProduct()
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

const mockAddProduct = (): IAddProduct => {
  class AddProductStub implements IAddProduct {
    async execute (data: Product): Promise<void> {
      return await Promise.resolve()
    }
  }
  const addProductStub = new AddProductStub()
  return addProductStub
}

interface SutTypes {
  sut: AddProductController
  validationStub: IValidation
  addProductStub: IAddProduct
}

const mockSut = (): SutTypes => {
  const addProductStub = mockAddProduct()
  const validationStub = mockValidation()
  const sut = new AddProductController(validationStub, addProductStub)
  return {
    sut,
    validationStub,
    addProductStub
  }
}

describe('Add Product IController', () => {
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

  test('Should call IAddProduct usign correct values', async () => {
    const { sut, addProductStub } = mockSut()
    const addProductSpy = jest.spyOn(addProductStub, 'execute')
    const request = mockRequest()
    await sut.handle(request)
    expect(addProductSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 500 if IAddProduct throws', async () => {
    const { sut, addProductStub } = mockSut()
    jest.spyOn(addProductStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut, addProductStub } = mockSut()
    jest.spyOn(addProductStub, 'execute')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
