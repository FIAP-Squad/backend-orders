import { type Router } from 'express'
import { adaptRoute } from '@/main/frameworks'
import {
  makeAddOrderController,
  makeLoadOrdersController
} from '@/main/factories/controllers'

export const orders = (router: Router): void => {
  router.post('/orders', adaptRoute(makeAddOrderController()))
  router.get('/orders', adaptRoute(makeLoadOrdersController()))
}
