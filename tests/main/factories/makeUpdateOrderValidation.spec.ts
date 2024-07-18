import { type IValidation } from '@/core'
import { RequiredFieldsValidation, ValidationComposite } from '@/adapters/validation'
import { makeUpdateOrderValidation } from '@/main/factories/validations'

jest.mock('@/adapters/validation/ValidationComposite')

describe('Add Order IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeUpdateOrderValidation()
    const validations: IValidation[] = []
    for (const field of ['status']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
