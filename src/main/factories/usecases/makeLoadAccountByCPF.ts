import { type ILoadAccountByCPF } from '@/core'
import { LoadACcountByCPF } from '@/usecases'
import { AccountRepository } from '@/adapters/repositories'

export const makeDbLoadAccountByCpf = (): ILoadAccountByCPF => {
  const repository = new AccountRepository()
  return new LoadACcountByCPF(repository)
}
