import { Component, OnInit } from '@angular/core';
import { IFlickrPhoto } from './../../../core/interfaces/photo';
import { FlickrService } from './../../../core/services/flickr.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  images: IFlickrPhoto[] = [];
  buttonName = 'Remove it!';
  homePage = false;

  constructor( private flickrService: FlickrService ) { }

  ngOnInit(): void {
    this.images = this.flickrService.getImages();
  }

}
