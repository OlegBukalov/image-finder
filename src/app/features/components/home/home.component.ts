import { IFlickrPhoto } from './../../../core/interfaces/photo';
import { Component, OnInit } from '@angular/core';
import { FlickrService } from './../../../core/services/flickr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: IFlickrPhoto[] = [];
  text = '';

  constructor( private flickrService: FlickrService ) { }

  ngOnInit(): void {
  }

  search(event: any) {
    this.text = event.target.value.toLowerCase();
    if (this.text && this.text.length > 0) {
      this.flickrService.search(this.text)
        .subscribe((images) => {
          this.images = images;
        })
        // .toPromise().then(data => {
        // this.images = data;
      //}
      //);
    }
  }

}
