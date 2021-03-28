export interface IFlickrPhoto {
  id: string;
  secret: string;
  server: string;
  title: string;
  tags: string;
  url_q: string;
  url_m: string;
  url_n: string;
}

export interface IFlickrOutput {
  photos: {
    photo: IFlickrPhoto[];
  };
}
