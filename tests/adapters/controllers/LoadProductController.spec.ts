import { type Product } from '@/domain'
import { type ILoadProducts, type IHTTPRequest } from '@/core'
import { LoadProductsController } from '@/adapters/controllers'
import {
  ok,
  noContent,
  serverError
} from '@/adapters/helpers'

const mockProducts = (): Product[] => ([
  {
    category: 'any_category',
    name: 'any_name',
    price: 1234,
    description: 'any_description',
    image: 'any_image'
  },
  {
    category: 'other_category',
    name: 'other_name',
    price: 1234,
    description: 'other_description',
    image: 'other_image'
  }
])

const mockLoadProducts = (): ILoadProducts => {
  class LoadProductsStub implements ILoadProducts {
    async execute (): Promise<Product[]> {
      return await Promise.resolve(mockProducts())
    }
  }
  return new LoadProductsStub()
}

const mockRequest = (): IHTTPRequest => ({
  query: {
    category: 'any_category'
  }
})

interface SutType {
  sut: LoadProductsController
  loadProductsStub: ILoadProducts
}

const mockSut = (): SutType => {
  const loadProductsStub = mockLoadProducts()
  const sut = new LoadProductsController(loadProductsStub)
  return {
    sut,
    loadProductsStub
  }
}

describe('ILoadProducts IController', () => {
  test('Should call ILoadProducts', async () => {
    const { sut, loadProductsStub } = mockSut()
    const loadSpy = jest.spyOn(loadProductsStub, 'execute')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledWith({})
  })

  test('Should return 200 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle({})
    expect(response).toEqual(ok(mockProducts()))
  })

  test('Should return a product on success', async () => {
    const { sut, loadProductsStub } = mockSut()
    jest.spyOn(loadProductsStub, 'execute').mockReturnValueOnce(Promise.resolve([mockProducts()[1]]))
    const response = await sut.handle(mockRequest())
    expect(response.body.length).toEqual(1)
  })

  test('Should return 204 LoadProduct returns empty', async () => {
    const { sut, loadProductsStub } = mockSut()
    jest.spyOn(loadProductsStub, 'execute').mockReturnValueOnce(Promise.resolve([]))
    const response = await sut.handle({})
    expect(response).toEqual(noContent())
  })

  test('Should 500 if ILoadProducts throws', async () => {
    const { sut, loadProductsStub } = mockSut()
    jest.spyOn(loadProductsStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})
