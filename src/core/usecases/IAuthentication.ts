export type AuthenticationParams = {
  email: string
  password: string
}

export interface IAuthentication {
  execute: (params: AuthenticationParams) => Promise<string>
}
