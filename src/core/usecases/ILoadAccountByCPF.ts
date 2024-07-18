import { type WithId, type Account } from '@/domain'

export interface ILoadAccountByCPF {
  execute: (cpf: string) => Promise<WithId<Account>>
}
