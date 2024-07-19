import {
  type UpdateOrderParams,
  type IUpdateOrderRepository
} from '@/core'
import { UpdateOrder } from '@/usecases'

const updateParams = (): UpdateOrderParams => ({
  body: {
    status: 'any_status'
  },
  id: 'any_id'
})

const mockUpdateOrderRepositoryStub = (): IUpdateOrderRepository => {
  class UpdateOrderStub implements IUpdateOrderRepository {
    async update (params: any): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new UpdateOrderStub()
}

type SutTypes = {
  sut: UpdateOrder
  updateOrderRepositoryStub: IUpdateOrderRepository
}

const mockSut = (): SutTypes => {
  const updateOrderRepositoryStub = mockUpdateOrderRepositoryStub()
  const sut = new UpdateOrder(updateOrderRepositoryStub)
  return {
    sut,
    updateOrderRepositoryStub
  }
}

describe('IUpdateOrder Usecase', () => {
  test('Should call IUpdateOrder Repository with correct values', async () => {
    const { sut, updateOrderRepositoryStub } = mockSut()
    const updateSpy = jest.spyOn(updateOrderRepositoryStub, 'update')
    await sut.execute(updateParams())
    expect(updateSpy).toHaveBeenCalledWith(updateParams())
  })

  test('Shoud throw Error if IUpdateOrderRepository Throw Error', async () => {
    const { sut, updateOrderRepositoryStub } = mockSut()
    jest.spyOn(updateOrderRepositoryStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(updateParams())
    await expect(promise).rejects.toThrow()
  })
})
