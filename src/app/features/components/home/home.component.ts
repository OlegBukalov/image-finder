import { IFlickrPhoto } from './../../../core/interfaces/photo';
import { Component } from '@angular/core';
import { FlickrService } from './../../../core/services/flickr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images: IFlickrPhoto[] = [];
  text = '';
  buttonName = 'Bookmark it!';
  homePage = true;

  constructor( private flickrService: FlickrService ) { }

  search(event: any): void {
    this.text = event.target.value.toLowerCase();
    if (this.text && this.text.length > 0) {
      this.flickrService.search(this.text)
        .subscribe((images) => {
          this.images = images;
        })
    }
  }

  applySearch(text: string): void {
    text = text.trim().toLowerCase();
    if (text && text.length>0) {
      this.flickrService.search(this.text)
        .subscribe((images) => {
          this.images = images;
        })
    }
  }

}
