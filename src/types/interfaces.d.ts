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