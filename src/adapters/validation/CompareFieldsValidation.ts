import { InvalidParam } from '@/adapters/errors'
import { type IValidation } from '@/core'

export class CompareFieldsValidation implements IValidation {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) { }

  validate (input: any): Error {
    if (input[this.field] !== input[this.fieldToCompare]) return new InvalidParam(this.fieldToCompare)
  }
}
