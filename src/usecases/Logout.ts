import { type ILogout, type IDeleteAccessTokenRepository } from '@/core'

export class Logout implements ILogout {
  constructor (private readonly _repository: IDeleteAccessTokenRepository) { }
  async execute (email: string): Promise<void> {
    await this._repository.deleteAccessToken(email)
  }
}
