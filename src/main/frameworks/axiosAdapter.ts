import axios from 'axios'
import {
  type IHTTPClientResponse,
  type IHTTPClientRequest
} from '@/core'

export const axiosAdapter = async (client: IHTTPClientRequest): Promise<IHTTPClientResponse<any>> => {
  const result = await axios[client.method](client.url, {
    params: client.params,
    data: client.data,
    headers: client.headers
  })
  return result
}
