import { IFlickrOutput, IFlickrPhoto } from './../interfaces/photo';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  imageBookmarks: IFlickrPhoto[] = [];

  constructor( private http: HttpClient ) { }

  search(text: string): Observable<IFlickrPhoto[]> {
    const url = 'https://api.flickr.com/services/rest/';
    const params = {
      api_key: environment.flickr.key,
      text: text,
      method: 'flickr.photos.search',
      sort: 'relevance',
      per_page: '12',
      media: 'photos',
      extras: 'tags,date_taken,owner_name,url_q,url_m,url_n',
      format: 'json',
      nojsoncallback: '1',
      page: '1'
    };

    return this.http.get<IFlickrOutput>(url, {params}).pipe(map((data) => data.photos.photo));
  }

  addToBookmarks(image: IFlickrPhoto): void {
    const foundImage = this.findImage(image);
    if (!foundImage) {
      this.imageBookmarks.push(image);
    }
  }

  getImages(): IFlickrPhoto[] {
    return this.imageBookmarks;
  }

  deleteImage(image: IFlickrPhoto): void {
    const index = this.imageBookmarks.indexOf(image);
    this.imageBookmarks.splice(index, 1);
  }

  findImage(image: IFlickrPhoto): IFlickrPhoto | undefined {
    const findImage = this.imageBookmarks.find(item => item.id === image.id);
    return findImage;
  }
}
