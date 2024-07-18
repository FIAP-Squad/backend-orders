import { type IAddAccount } from '@/core'
import { AddAccount } from '@/usecases'
import { BcryptAdapter } from '@/infrastructure/criptography'
import { AccountRepository } from '@/adapters/repositories'

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12
  const bcrypt = new BcryptAdapter(salt)
  const repository = new AccountRepository()
  return new AddAccount(bcrypt, repository, repository)
}
