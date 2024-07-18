import { type WithId, type Account } from '@/domain'

export interface IAddAccount {
  execute: (params: Account) => Promise<WithId<Account>>
}
