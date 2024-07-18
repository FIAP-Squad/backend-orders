import {
  type UpdatePaymentParams,
  type IUpdatePaymentRepository
} from '@/core'
import { UpdatePayment } from '@/usecases'

const updatePaymentParams = (): UpdatePaymentParams => ({
  body: {
    status: 'any_status'
  },
  id: 'any_id'
})

const mockUpdatePaymentRepositoryStub = (): IUpdatePaymentRepository => {
  class UpdatePaymentStub implements IUpdatePaymentRepository {
    async update (params: any): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new UpdatePaymentStub()
}

type SutTypes = {
  sut: UpdatePayment
  updatePaymentRepositoryStub: IUpdatePaymentRepository
}

const mockSut = (): SutTypes => {
  const updatePaymentRepositoryStub = mockUpdatePaymentRepositoryStub()
  const sut = new UpdatePayment(updatePaymentRepositoryStub)
  return {
    sut,
    updatePaymentRepositoryStub
  }
}

describe('IUpdatePayment Usecase', () => {
  test('Should call IUpdatePayment Repository with correct values', async () => {
    const { sut, updatePaymentRepositoryStub } = mockSut()
    const updateSpy = jest.spyOn(updatePaymentRepositoryStub, 'update')
    await sut.execute(updatePaymentParams())
    expect(updateSpy).toHaveBeenCalledWith(updatePaymentParams())
  })

  test('Shoud throw Error if IUpdatePaymentRepository Throw Error', async () => {
    const { sut, updatePaymentRepositoryStub } = mockSut()
    jest.spyOn(updatePaymentRepositoryStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(updatePaymentParams())
    await expect(promise).rejects.toThrow()
  })
})
