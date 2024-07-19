import { type Router } from 'express'
import { adaptRoute } from '@/main/frameworks'
import {
  makeAddOrderController,
  makeLoadOrdersController,
  makeUpdateOrderController
} from '@/main/factories/controllers'

export const orders = (router: Router): void => {
  router.post('/orders', adaptRoute(makeAddOrderController()))
  router.get('/orders', adaptRoute(makeLoadOrdersController()))
  router.patch('/orders/:id', adaptRoute(makeUpdateOrderController()))
}
