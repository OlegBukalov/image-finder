import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { IFlickrOutput, IFlickrPhoto } from './../interfaces/photo';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  imageBookmarks: IFlickrPhoto[] = [];
  prevText = '';
  currentPage = 1;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  search(keyText: string): Observable<IFlickrPhoto[]> {
    if (this.prevText === keyText) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
    this.prevText = keyText;
    const url = 'https://api.flickr.com/services/rest/';
    const params = {
      api_key: environment.flickr.key,
      text: keyText,
      method: 'flickr.photos.search',
      sort: 'relevance',
      per_page: '1000',
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
      this.localStorageService.setItem('images', this.imageBookmarks);
    }
  }

  getImages(): IFlickrPhoto[] {
    if (this.imageBookmarks.length === 0) {
      const imagesFromLocalStorage = this.localStorageService.getItem('images');
      if (Array.isArray(imagesFromLocalStorage) ) {
        for (const saveImage of imagesFromLocalStorage) {
          const image: IFlickrPhoto = {
            id: saveImage.id,
            secret: saveImage.secret,
            server: saveImage.server,
            title: saveImage.title,
            tags: saveImage.tags,
            url_q: saveImage.url_q,
            url_m: saveImage.url_m,
            url_n: saveImage.url_n
          };
          this.imageBookmarks.push(image);
        }
      }
    }
    return this.imageBookmarks;
  }

  deleteImage(image: IFlickrPhoto): void {
    const index = this.imageBookmarks.indexOf(image);
    this.imageBookmarks.splice(index, 1);
    this.localStorageService.setItem('images', this.imageBookmarks);
  }

  findImage(image: IFlickrPhoto): IFlickrPhoto | undefined {
    const findImage = this.imageBookmarks.find(item => item.id === image.id);
    return findImage;
  }
}
