import { type Express, Router } from 'express'
import { health, orders } from '@/main/routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  orders(router)
  health(router)
}
