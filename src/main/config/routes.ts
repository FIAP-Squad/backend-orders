import { type Express, Router } from 'express'
import { order, health } from '@/main/routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  order(router)
  health(router)
}
