import { type IHTTPRequest, type IDeleteProduct } from '@/core'
import { DeleteProductController } from '@/adapters/controllers'
import {
  serverError,
  noContent
} from '@/adapters/helpers'

const mockDeleteProduct = (): IDeleteProduct => {
  class DeleteProductStub implements IDeleteProduct {
    async execute (id: string): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new DeleteProductStub()
}

const mockRequest = (): IHTTPRequest => ({
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: DeleteProductController
  deleteProductStub: IDeleteProduct
}

const mockSut = (): SutTypes => {
  const deleteProductStub = mockDeleteProduct()
  const sut = new DeleteProductController(deleteProductStub)
  return {
    sut,
    deleteProductStub
  }
}

describe('IDeleteProduct IController', () => {
  test('Should call IDeleteProduct with correct values', async () => {
    const { sut, deleteProductStub } = mockSut()
    const deleteSpy = jest.spyOn(deleteProductStub, 'execute')
    await sut.handle(mockRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if IDeleteProduct throws', async () => {
    const { sut, deleteProductStub } = mockSut()
    jest.spyOn(deleteProductStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 if IDeleteProduct returns empty', async () => {
    const { sut, deleteProductStub } = mockSut()
    jest.spyOn(deleteProductStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
