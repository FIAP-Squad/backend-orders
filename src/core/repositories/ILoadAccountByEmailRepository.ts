import { type WithId, type Account } from '@/domain'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<WithId<Account>>
}
