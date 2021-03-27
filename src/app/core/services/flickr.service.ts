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
      extras: 'tags,date_taken,owner_name,url_q,url_m',
      format: 'json',
      nojsoncallback: '1',
      page: '1'
    };

    return this.http.get<IFlickrOutput>(url, {params}).pipe(map((data) => data.photos.photo));
    //`api_key=${environment.flickr.key}&text=${text}&format=json&nojsoncallback=1&per_page=12`;
    // console.log(url + params)
    // return this.http.get(url + params).pipe(map((data: IFlickrOutput) => {
    //   const urlArr = [];
    //   data.photos.photo.forEach((photo: IFlickrPhoto) => {
    //     console.log(photo)
    //     const photoObj = {
    //       url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`,
    //       title: photo.title
    //     };
    //     urlArr.push(photoObj);
    //   });
    //   return urlArr;
    // }));
  }
}
