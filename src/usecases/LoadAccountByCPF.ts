import { type WithId, type Account } from '@/domain'
import { type ILoadAccountByCPF, type ILoadAccountByCPFRepository } from '@/core'
export class LoadACcountByCPF implements ILoadAccountByCPF {
  constructor (private readonly _repository: ILoadAccountByCPFRepository) { }
  async execute (cpf: string): Promise<WithId<Account>> {
    return await this._repository.loadByCpf(cpf)
  }
}
