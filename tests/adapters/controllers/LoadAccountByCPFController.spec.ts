import { type WithId, type Account } from '@/domain'
import { type IHTTPRequest, type ILoadAccountByCPF } from '@/core'
import { LoadAccountByCPFController } from '@/adapters/controllers'
import {
  notFound,
  serverError,
  ok
} from '@/adapters/helpers'

const mockRequest = (): IHTTPRequest => ({
  params: {
    cpf: 'valid_cpf'
  }
})

const mockAccount = (): WithId<Account> => ({
  id: 'valid_id',
  cpf: 'valid_cpf',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const mockLoadAccountByCpf = (): ILoadAccountByCPF => {
  class LoadAccountByCpfStub implements ILoadAccountByCPF {
    async execute (cpf: string): Promise<WithId<Account>> {
      return await Promise.resolve(mockAccount())
    }
  }
  return new LoadAccountByCpfStub()
}

type SutTypes = {
  sut: LoadAccountByCPFController
  loadAccountByCpfStub: ILoadAccountByCPF
}

const mockSut = (): SutTypes => {
  const loadAccountByCpfStub = mockLoadAccountByCpf()
  const sut = new LoadAccountByCPFController(loadAccountByCpfStub)
  return {
    sut,
    loadAccountByCpfStub
  }
}

describe('ILoadAccountByCPF IController', () => {
  test('Should call LoadAccountById with correct values', async () => {
    const { sut, loadAccountByCpfStub } = mockSut()
    const loadbyCpfSpy = jest.spyOn(loadAccountByCpfStub, 'execute')
    await sut.handle(mockRequest())
    expect(loadbyCpfSpy).toHaveBeenCalledWith('valid_cpf')
  })

  test('Should return 404 if ILoadAccountByCPF returns empty', async () => {
    const { sut, loadAccountByCpfStub } = mockSut()
    jest.spyOn(loadAccountByCpfStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(notFound())
  })

  test('Should return 500 if ILoadAccountByCPF throws', async () => {
    const { sut, loadAccountByCpfStub } = mockSut()
    jest.spyOn(loadAccountByCpfStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(mockAccount()))
  })
})
