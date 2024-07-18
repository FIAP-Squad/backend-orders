import { type IValidation, type IHTTPRequest, type UpdatePaymentParams, type IUpdatePayment } from '@/core'
import { UpdatePaymentController } from '@/adapters/controllers'
import { badRequest, noContent, serverError } from '@/adapters/helpers'

const mockUpdatePayment = (): IUpdatePayment => {
  class UpdatePaymentStub implements IUpdatePayment {
    async execute (params: UpdatePaymentParams): Promise<void> {
      return await Promise.resolve(null)
    }
  }
  return new UpdatePaymentStub()
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
    status: 'any_status'
  },
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: UpdatePaymentController
  updatePaymentStub: IUpdatePayment
  validationStub: IValidation
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const updatePaymentStub = mockUpdatePayment()
  const sut = new UpdatePaymentController(validationStub, updatePaymentStub)
  return {
    sut,
    updatePaymentStub,
    validationStub
  }
}

describe('UpdatePaymentController', () => {
  test('Should call IUpdatePayment with correct values', async () => {
    const { sut, updatePaymentStub } = mockSut()
    const updateSpy = jest.spyOn(updatePaymentStub, 'execute')
    await sut.handle(mockRequest())
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'any_id',
      body: {
        status: 'any_status'
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

  test('Should return 500 if IUpdatePayment throws', async () => {
    const { sut, updatePaymentStub } = mockSut()
    jest.spyOn(updatePaymentStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
