export interface IProxy {
  getUser(id: number): Promise<any>;
}
