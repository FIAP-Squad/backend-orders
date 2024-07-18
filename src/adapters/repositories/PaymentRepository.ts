import { axiosAdapter } from '@/main/frameworks/axiosAdapter'
import { type Payment } from '@/domain'
import {
  type ILoadPaymentsRepository,
  type IUpdatePaymentRepository,
  type IAddPaymentRepository,
  type UpdatePaymentParamsRepository,
  METHOD
} from '@/core'
import env from '@/main/config/env'

export class PaymentRepository implements ILoadPaymentsRepository, IAddPaymentRepository, IUpdatePaymentRepository {
  async addPayment (body: Payment): Promise<void> {
    const { data } = await axiosAdapter({
      method: METHOD.POST,
      url: `${env.PAYMENT}`,
      data: body
    })
    return data
  }

  async update (params: UpdatePaymentParamsRepository): Promise<void> {
    const { id, body } = params
    const { data } = await axiosAdapter({
      method: METHOD.PATCH,
      url: `${env.PAYMENT}/${id}`,
      data: body
    })
    return data
  }

  async loadAll (filter: any): Promise<Payment[]> {
    const { data } = await axiosAdapter<Payment[]>({
      method: METHOD.GET,
      url: `${env.PAYMENT}`
    })
    return data
  }
}

// method, url, params, data, headers
