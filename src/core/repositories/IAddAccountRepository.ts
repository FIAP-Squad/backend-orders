import { type WithId, type Account } from '@/domain'

export interface IAddAccountRepository {
  add: (params: Account) => Promise<WithId<Account>>
}
