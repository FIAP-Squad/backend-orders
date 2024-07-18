import {
  ServerError,
  NotFound,
  Unauthorized
} from '@/adapters/errors'
import { type IHTTPResponse } from '@/core'

export const ok = (data: any): IHTTPResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): IHTTPResponse => ({
  statusCode: 204,
  body: null
})

export const created = (): IHTTPResponse => ({
  statusCode: 201,
  body: null
})

export const badRequest = (error: Error): IHTTPResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): IHTTPResponse => ({
  statusCode: 401,
  body: new Unauthorized()
})

export const forbidden = (error: Error): IHTTPResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (): IHTTPResponse => ({
  statusCode: 404,
  body: new NotFound()
})

export const serverError = (error: Error): IHTTPResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
