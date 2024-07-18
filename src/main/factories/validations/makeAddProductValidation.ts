import { RequiredFieldsValidation, ValidationComposite } from '@/adapters/validation'
import { type IValidation } from '@/core'

export const makeAddProductValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['name', 'category', 'price', 'description', 'image']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
