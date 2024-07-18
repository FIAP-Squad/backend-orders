import { type WithId, type Account } from '@/domain'

export interface ILoadAccountByCPFRepository {
  loadByCpf: (cpf: string) => Promise<WithId<Account>>
}
