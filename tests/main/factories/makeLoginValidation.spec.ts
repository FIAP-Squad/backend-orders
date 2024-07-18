import { type IValidation } from '@/core'
import { EmailValidatorAdapter } from '@/infrastructure/validators'
import { makeLoginValidation } from '@/main/factories/validations'
import {
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite
} from '@/adapters/validation'

jest.mock('@/adapters/validation/ValidationComposite')

describe('Login IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeLoginValidation()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
