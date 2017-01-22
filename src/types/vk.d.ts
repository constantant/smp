//vk.com api
interface IVKAuth {
  login: (callback: () => void, settings: number) => void;
  logout: (callback: () => void) => void;
  revokeGrants: (callback: () => void) => void;
  getLoginStatus: (callback?: (status: IVKStatus) => void) => void;
  getSession: () => Object
}
interface IVKApi {
  call: (apiMethodName: string, paramsObject: Object, successCallBack: (data: { response: Array<any> }) => void) => void;
}
interface IVKObserver {
  subscribe: (event: string, handler: (results: Object) => void) => void;
  unsubscribe: (event: string, handler: () => void) => void;
}
interface IVKUI {

}
interface IVK {
  init: (params: { apiId: number }) => void;
  Auth: IVKAuth;
  Api: IVKApi;
  Observer: IVKObserver;
  UI: IVKUI
}

interface IVKStatus {
  session: Object,
  status: string
}

declare var VK: IVK;
