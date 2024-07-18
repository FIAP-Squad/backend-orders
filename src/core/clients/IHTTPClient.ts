export interface IHTTPClientRequest {
  method: METHOD
  url: string
  headers?: any
  params?: any
  data?: any
  responseType?: any
}

export interface IHTTPClientResponse<T> {
  data: T
  status: number
  statusText: string
  headers: any
  config: any
  request?: any
}

export enum METHOD {
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put',
  GET = 'get',
  DELETE = 'delete'
}
