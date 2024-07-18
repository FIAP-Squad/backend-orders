import { type IValidation } from '@/core'
import {
  MandatoryFieldValidation,
  ValidationComposite
} from '@/adapters/validation'

export const makeUpdatePaymentValidation = (): IValidation => {
  const validations: IValidation[] = []
  const fields = ['status']
  validations.push(new MandatoryFieldValidation(fields))
  return new ValidationComposite(validations)
}
