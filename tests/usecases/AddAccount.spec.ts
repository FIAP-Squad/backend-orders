import { AddAccount } from '@/usecases'
import { type WithId, type Account } from '@/domain'
import {
  type IHasher,
  type IAddAccountRepository,
  type ILoadAccountByEmailRepository
} from '@/core'

const mockHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

const mockAccountWithId = (): WithId<Account> => ({
  id: 'any_id',
  cpf: 'valid_cpf',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const mockAccount = (): Account => ({
  cpf: 'valid_cpf',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (params: Account): Promise<WithId<Account>> {
      return await Promise.resolve(mockAccountWithId())
    }
  }
  return new AddAccountRepositoryStub()
}

const mockLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<WithId<Account>> {
      return await Promise.resolve(null)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
  sut: AddAccount
  hasherStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const mockSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new AddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('AddAccount Usecase', () => {
  test('Shoud call IHasher with correct password', async () => {
    const { sut, hasherStub } = mockSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    await sut.execute(mockAccount())
    expect(hasherSpy).toHaveBeenCalledWith('hashed_password')
  })

  test('Shoud throw Error if IHasher Throw Error', async () => {
    const { sut, hasherStub } = mockSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(mockAccount())
    await expect(promise).rejects.toThrow()
  })

  test('Shoud call IAddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.execute(mockAccount())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      cpf: 'valid_cpf',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Shoud return an Account on success', async () => {
    const { sut } = mockSut()
    const account = await sut.execute(mockAccount())
    expect(account).toEqual(mockAccountWithId())
  })

  test('Shoud throw Error if IHasher Throw Error', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(mockAccount())
    await expect(promise).rejects.toThrow()
  })

  test('Should call ILoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = mockSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.execute(mockAccount())
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
