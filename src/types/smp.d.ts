interface IPostItem {
  id: number,
  type: number,
  timestamp: number,
  from_id: number,
  text: string
}

interface IGeo {
  coordinates: string,
  place: IPlace
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

interface IUserInfo {
  id: number
  first_name: string
  last_name: string
  photo_50: string
}
