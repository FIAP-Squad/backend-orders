import { type IValidation, type IHTTPRequest, type UpdateProductParams, type IUpdateProduct } from '@/core'
import { UpdateProductController } from '@/adapters/controllers'
import { badRequest, noContent, serverError } from '@/adapters/helpers'

const mockUpdateProduct = (): IUpdateProduct => {
  class UpdateProductStub implements IUpdateProduct {
    async execute (params: UpdateProductParams): Promise<void> {
      return await Promise.resolve(null)
    }
  }
  return new UpdateProductStub()
}

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockRequest = (): IHTTPRequest => ({
  body: {
    category: 'other_category',
    name: 'any_name',
    price: 1234,
    description: 'any_description',
    image: 'any_image'
  },
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: UpdateProductController
  updateProductStub: IUpdateProduct
  validationStub: IValidation
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const updateProductStub = mockUpdateProduct()
  const sut = new UpdateProductController(validationStub, updateProductStub)
  return {
    sut,
    updateProductStub,
    validationStub
  }
}

describe('UpdateProductContrller', () => {
  test('Should call IUpdateProduct with correct values', async () => {
    const { sut, updateProductStub } = mockSut()
    const updateSpy = jest.spyOn(updateProductStub, 'execute')
    await sut.handle(mockRequest())
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'any_id',
      body: {
        category: 'other_category',
        name: 'any_name',
        price: 1234,
        description: 'any_description',
        image: 'any_image'
      }
    })
  })

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validationSpy).toHaveBeenCalledWith(mockRequest().body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should return 500 if IUpdateProduct throws', async () => {
    const { sut, updateProductStub } = mockSut()
    jest.spyOn(updateProductStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
