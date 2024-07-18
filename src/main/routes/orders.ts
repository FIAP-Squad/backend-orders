import { type Router } from 'express'
import { adaptRoute } from '@/main/frameworks'
import {
  makeAddOrderController
} from '@/main/factories/controllers'

export const orders = (router: Router): void => {
  router.post('/orders', adaptRoute(makeAddOrderController()))
}
