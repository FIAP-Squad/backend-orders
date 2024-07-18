import { type WithId, type Account } from '@/domain'

export interface ILoadAccountByToken {
  execute: (accessToken: string, role?: string) => Promise<WithId<Account>>
}
