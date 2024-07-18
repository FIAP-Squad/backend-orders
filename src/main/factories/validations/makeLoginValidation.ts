import { EmailValidation, RequiredFieldsValidation, ValidationComposite } from '@/adapters/validation'
import { type IValidation } from '@/core'
import { EmailValidatorAdapter } from '@/infrastructure/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
