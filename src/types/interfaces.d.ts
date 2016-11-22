interface IUserInfo {
    id: number
    first_name: string
    last_name: string
    photo_50: string
}

interface IPlace {
    city: string,
    country: string,
    created: string,
    icon: string,
    id: number,
    latitude: number,
    longitude: number,
    title: string
}

interface IGeo {
    coordinates: string,
    place: IPlace
}

interface IPostItem {
    id: number,
    created_by: number,
    date: number,
    dateEvent: number,
    text?: string,
    geo?: IGeo,
    images?: string[]
}

interface IReportItem {
    id: number,
    created_by: number,
    date: number,
    text?: string,
    geo?: IGeo,
    images?: string[]
}


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