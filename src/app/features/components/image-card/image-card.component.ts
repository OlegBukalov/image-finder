import { FlickrService } from './../../../core/services/flickr.service';
import { Component, Input } from '@angular/core';
import { IFlickrPhoto } from './../../../core/interfaces/photo';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent {
  @Input() image: IFlickrPhoto;
  @Input() buttonName: string;
  @Input() homePage: boolean;

  constructor( private flickrService: FlickrService ) { }

  actionWithBookmarks(): void {
    if (this.homePage) {
      this.flickrService.addToBookmarks(this.image);
    } else {
      this.flickrService.deleteImage(this.image);
    }
  }
}
