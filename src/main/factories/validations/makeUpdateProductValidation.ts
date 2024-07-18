import { type IValidation } from '@/core'
import {
  MandatoryFieldValidation,
  ValidationComposite
} from '@/adapters/validation'

export const makeUpdateProductValidation = (): IValidation => {
  const validations: IValidation[] = []
  const fields = ['name', 'category', 'price', 'description', 'image']
  validations.push(new MandatoryFieldValidation(fields))
  return new ValidationComposite(validations)
}
