import { adaptMiddleware } from '@/main/frameworks'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
