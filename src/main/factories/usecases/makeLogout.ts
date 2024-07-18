import { type ILogout } from '@/core'
import { Logout } from '@/usecases'
import { AccountRepository } from '@/adapters/repositories'

export const makeDbLogout = (): ILogout => {
  const repository = new AccountRepository()
  return new Logout(repository)
}
