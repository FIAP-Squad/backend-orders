import { makeDbLoadAccountByToken } from '@/main/factories/usecases'
import { AuthMiddleware } from '@/adapters/middlewares'
import { type IMiddleware } from '@/core'

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
