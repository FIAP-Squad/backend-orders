import env from '@/main/config/env'
import { type ILoadAccountByToken } from '@/core'
import { LoadAccountByToken } from '@/usecases'
import { JwtAdapter } from '@/infrastructure/criptography'
import { AccountRepository } from '@/adapters/repositories'

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwt = new JwtAdapter(env.JWT_SECRET)
  const repository = new AccountRepository()
  return new LoadAccountByToken(jwt, repository)
}
