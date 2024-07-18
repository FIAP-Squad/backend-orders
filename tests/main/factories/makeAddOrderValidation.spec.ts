import { type IValidation } from '@/core'
import { RequiredFieldsValidation, ValidationComposite } from '@/adapters/validation'
import { makeAddOrderValidation } from '@/main/factories/validations'

jest.mock('@/adapters/validation/ValidationComposite')

describe('Add Order IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeAddOrderValidation()
    const validations: IValidation[] = []
    for (const field of ['customer', 'items', 'status', 'amount']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
