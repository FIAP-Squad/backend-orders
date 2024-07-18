import { RequiredFieldsValidation, ValidationComposite } from '@/adapters/validation'
import { type IValidation } from '@/core'

export const makeAddOrderValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['customer', 'items', 'status', 'amount', 'payment']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
