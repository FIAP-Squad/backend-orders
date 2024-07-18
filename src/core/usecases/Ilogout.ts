export interface ILogout {
  execute: (email: string) => Promise<void>
}
