import { type IValidation } from '@/core'
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite
} from '@/adapters/validation'
import { CPFValidation } from '@/adapters/validation/CPFValidation'
import { EmailValidatorAdapter } from '@/infrastructure/validators/EmailValidatorAdapter'
import { makeSignUpValidation } from '@/main/factories/validations/makeSignUpValidation'

jest.mock('@/adapters/validation/ValidationComposite')

describe('SignUp IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'cpf', 'email', 'password', 'passwordConfirmation']) { validations.push(new RequiredFieldsValidation(field)) }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    validations.push(new CPFValidation('cpf'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
