export interface IQueueSettings  {
  request: {
    name: string
    key: string
  }
  response: {
    name: string
    key: string
  }
}

export type IHandler = (msg: string) => void