import { RequiredFieldsValidation, ValidationComposite } from '@/adapters/validation'
import { type IValidation } from '@/core'

export const makeLogoutValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
