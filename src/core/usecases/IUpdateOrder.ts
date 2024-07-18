export type UpdateOrderParams = {
  id: string
  status: string
}

export interface IUpdateOrder {
  execute: (params: UpdateOrderParams) => Promise<void>
}
