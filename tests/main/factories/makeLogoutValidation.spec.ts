import { type IValidation } from '@/core'
import { makeLogoutValidation } from '@/main/factories/validations'
import {
  RequiredFieldsValidation,
  ValidationComposite
} from '@/adapters/validation'

jest.mock('@/adapters/validation/ValidationComposite')

describe('Logout IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeLogoutValidation()
    const validations: IValidation[] = []
    for (const field of ['email']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
