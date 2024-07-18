import {
  type IHashComparer,
  type ILoadAccountByEmailRepository,
  type IEncrypter,
  type IUpdateAccessTokenRepository,
  type IAuthentication,
  type AuthenticationParams
} from '@/core'

export class Authentication implements IAuthentication {
  constructor (
    private readonly loadRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateRepository: IUpdateAccessTokenRepository
  ) { }

  async execute (params: AuthenticationParams): Promise<string> {
    const account = await this.loadRepository.loadByEmail(params.email)
    if (account) {
      const isValid = await this.hashComparer.compare(params.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
