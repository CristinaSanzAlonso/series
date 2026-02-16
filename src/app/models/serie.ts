//definimos la estructura y su tipo que van a tener los datos que nos lleguen de la api
export interface Serie {
    id: number; 
    title: string; 
    creator: string; 
    rating: number; 
    dates: string; 
    image: string; 
    channel: string
}