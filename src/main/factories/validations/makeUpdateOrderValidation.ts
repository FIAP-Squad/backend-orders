import { RequiredFieldsValidation, ValidationComposite } from '@/adapters/validation'
import { type IValidation } from '@/core'

export const makeUpdateOrderValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['status']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
