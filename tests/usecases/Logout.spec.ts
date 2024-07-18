import { type IDeleteAccessTokenRepository } from '@/core'
import { Logout } from '@/usecases'

const mockDeleteAccesstokenRepository = (): IDeleteAccessTokenRepository => {
  class DeleteAccessTokenRepositoryStub implements IDeleteAccessTokenRepository {
    async deleteAccessToken (email: string): Promise<void> {
      await Promise.resolve()
    }
  }
  return new DeleteAccessTokenRepositoryStub()
}

type SutTypes = {
  deleteAccessTokenStub: IDeleteAccessTokenRepository
  sut: Logout
}

const mockSut = (): SutTypes => {
  const deleteAccessTokenStub = mockDeleteAccesstokenRepository()
  const sut = new Logout(deleteAccessTokenStub)
  return {
    sut,
    deleteAccessTokenStub
  }
}

describe('ILogout Usecase', () => {
  test('Should call DeleteAccesstoken with correct values', async () => {
    const { sut, deleteAccessTokenStub } = mockSut()
    const loadSpy = jest.spyOn(deleteAccessTokenStub, 'deleteAccessToken')
    await sut.execute('any_email')
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should throw if deleteAccessTokenStubRepository throws', async () => {
    const { sut, deleteAccessTokenStub } = mockSut()
    jest.spyOn(deleteAccessTokenStub, 'deleteAccessToken').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute('any_email')
    await expect(promise).rejects.toThrow()
  })
})
