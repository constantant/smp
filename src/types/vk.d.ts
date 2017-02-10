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

interface IVKResponseUsers {
  response: IVKUser[]
}

interface IVKUser {
  id: number,
  first_name: string,
  last_name: string,
  photo_50?: string
}

interface IVKResponseGroups {
  response: IVKGroup[]
}

interface IVKGroup {
  description?: string,
  id: number,
  is_closed: 0 | 1,
  name: string,
  photo_50: string,
  photo_100: string,
  photo_200: string,
  screen_name: string,
  status?: string,
  type: string
}

interface IVKResponseWall {
  response: IVKResponseWallData
}

interface IVKResponseWallData {
  count?: number,
  groups?: any[],
  items?: IVKPost[],
  profiles?: any[]
}

interface IVKPost {
  attachments: IVKAttachment[],
  can_delete: 0 | 1,
  comments: IVKCommentsInfo,
  date: number,
  from_id: number,
  id: number,
  likes: IVKLikesInfo,
  marked_as_ads: 0 | 1,
  owner_id: number,
  post_source: { type: string },
  post_type: string,
  reposts: IVKRepostsInfo,
  text: string
}

interface IVKAttachment {
  type: 'photo' | 'video' | 'audio' | 'doc' | 'graffiti' | 'link' | 'note' | 'app' | 'poll' | 'page' | 'album' | 'photos_list' | 'market' | 'market_album' | 'sticker',
  photo?: IVKAttachmentPhoto
}

interface IVKAttachmentPhoto {
  access_key: string,
  album_id: number,
  date: number,
  height: number,
  id: number,
  owner_id: number,
  photo_75: string,
  photo_130: string,
  photo_604?: string,
  photo_807?: string,
  photo_1280?: string,
  post_id: number,
  text: string,
  user_id: number,
  width: number
}

interface IVKRepostsInfo {
  user_reposted: number,
  count: number
}

interface IVKLikesInfo {
  can_like: 0 | 1,
  can_publish: 0 | 1,
  count: number,
  user_likes: number
}

interface IVKCommentsInfo {
  can_post: 0 | 1,
  count: number
}

declare var VK: IVK;
